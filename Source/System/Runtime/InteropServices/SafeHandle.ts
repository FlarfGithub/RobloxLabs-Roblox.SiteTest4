// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Class:  SafeHandle
**
**
** A specially designed handle wrapper to ensure we never leak
** an OS handle.  The runtime treats this class specially during
** P/Invoke marshaling and finalization.  Users should write
** subclasses of SafeHandle for each distinct handle type.
**
** 
===========================================================*/

import { IDisposable } from '../../IDisposable';

/*
  Problems addressed by the SafeHandle class:
  1) Critical finalization - ensure we never leak OS resources in SQL.  Done
     without running truly arbitrary & unbounded amounts of managed code.
  2) Reduced graph promotion - during finalization, keep object graph small
  3) GC.KeepAlive behavior - P/Invoke vs. finalizer thread ---- (HandleRef)
  4) Elimination of security ----s w/ explicit calls to Close (HandleProtector)
  5) Enforcement of the above via the type system - Don't use IntPtr anymore.
  6) Allows the handle lifetime to be controlled externally via a boolean.
 
  Subclasses of SafeHandle will implement the ReleaseHandle abstract method
  used to execute any code required to free the handle. This method will be
  prepared as a constrained execution region at instance construction time
  (along with all the methods in its statically determinable call graph). This
  implies that we won't get any inconvenient jit allocation errors or rude
  thread abort interrupts while releasing the handle but the user must still
  write careful code to avoid injecting fault paths of their own (see the CER
  spec for more details). In particular, any sub-methods you call should be
  decorated with a reliability contract of the appropriate level. In most cases
  this should be:
    ReliabilityContract(Consistency.WillNotCorruptState, Cer.Success)
  Also, any P/Invoke methods should use the SuppressUnmanagedCodeSecurity
  attribute to avoid a runtime security check that can also inject failures
  (even if the check is guaranteed to pass).
 
  The GC will run ReleaseHandle methods after any normal finalizers have been
  run for objects that were collected at the same time. This ensures classes
  like FileStream can run a normal finalizer to flush out existing buffered
  data. This is key - it means adding this class to a class like FileStream does
  not alter our current semantics w.r.t. finalization today.
 
  Subclasses must also implement the IsInvalid property so that the
  infrastructure can tell when critical finalization is actually required.
  Again, this method is prepared ahead of time. It's envisioned that direct
  subclasses of SafeHandle will provide an IsInvalid implementation that suits
  the general type of handle they support (null is invalid, -1 is invalid etc.)
  and then these classes will be further derived for specific safe handle types.
 
  Most classes using SafeHandle should not provide a finalizer.  If they do
  need to do so (ie, for flushing out file buffers, needing to write some data
  back into memory, etc), then they can provide a finalizer that will be 
  guaranteed to run before the SafeHandle's critical finalizer.  
 
  Note that SafeHandle's ReleaseHandle is called from a constrained execution 
  region, and is eagerly prepared before we create your class.  This means you
  should only call methods with an appropriate reliability contract from your
  ReleaseHandle method.
 
  Subclasses are expected to be written as follows (note that
  SuppressUnmanagedCodeSecurity should always be used on any P/Invoke methods
  invoked as part of ReleaseHandle, in order to switch the security check from
  runtime to jit time and thus remove a possible failure path from the
  invocation of the method):
 
  internal sealed MySafeHandleSubclass : SafeHandle {
      // Called by P/Invoke when returning SafeHandles
      private MySafeHandleSubclass() : base(IntPtr.Zero, true)
      {
      }
 
      // If & only if you need to support user-supplied handles
      internal MySafeHandleSubclass(IntPtr preexistingHandle, bool ownsHandle) : base(IntPtr.Zero, ownsHandle)
      {
          SetHandle(preexistingHandle);
      }
 
      // Do not provide a finalizer - SafeHandle's critical finalizer will
      // call ReleaseHandle for you.
 
      public override bool IsInvalid {
          get { return handle == IntPtr.Zero; }
      }
 
      override protected bool ReleaseHandle()
      {
          return MyNativeMethods.CloseHandle(handle);
      }
  }
 
  Then elsewhere to create one of these SafeHandles, define a method
  with the following type of signature (CreateFile follows this model).
  Note that when returning a SafeHandle like this, P/Invoke will call your
  class's default constructor.  Also, you probably want to define CloseHandle
  somewhere, and remember to apply a reliability contract to it.
 
  [SuppressUnmanagedCodeSecurity]
  internal static class MyNativeMethods {
      [DllImport("kernel32")]
      private static extern MySafeHandleSubclass CreateHandle(int someState);
 
      [DllImport("kernel32", SetLastError=true), ReliabilityContract(Consistency.WillNotCorruptState, Cer.Success)]
      private static extern bool CloseHandle(IntPtr handle);
  }
 
  Drawbacks with this implementation:
  1) Requires some magic to run the critical finalizer.
  2) Requires more memory than just an IntPtr.
  3) If you use DangerousAddRef and forget to call DangerousRelease, you can leak a SafeHandle.  Use CER's & don't do that.
 */

// This class should not be serializable - it's a handle.  We require unmanaged
// code permission to subclass SafeHandle to prevent people from writing a
// subclass and suddenly being able to run arbitrary native code with the
// same signature as CloseHandle.  This is technically a little redundant, but
// we'll do this to ensure we've cut off all attack vectors.  Similarly, all
// methods have a link demand to ensure untrusted code cannot directly edit
// or alter a handle.
export abstract class SafeHandle implements IDisposable {
	// ! Do not add or rearrange fields as the EE depends on this layout.
	//------------------------------------------------------------------
	protected handle: IntPtr; // this must be protected so derived classes can use out params.
	// private _state: int; // Combined ref count and closed/disposed flags (so we can atomically modify them).
	// private _ownsHandle: bool; // Whether we can release this handle.
	// private _fullyInitialized: bool; // Whether constructor completed.

	// Creates a SafeHandle class.  Users must then set the Handle property.
	// To prevent the SafeHandle from being freed, write a subclass that
	// doesn't define a finalizer.
	protected constructor(invalidHandleValue: IntPtr, ownsHandle: bool) {
		this.handle = invalidHandleValue;
		// this._state = 4; // Ref count 1 and not closed or disposed.
		// this._ownsHandle = ownsHandle;

		if (!ownsHandle) {
			// GC.SuppressFinalize(this); // TODO IMPLEMENT !!!!!
		}

		// Set this last to prevent SafeHandle's finalizer from freeing an
		// invalid handle.  This means we don't have to worry about
		// ThreadAbortExceptions interrupting this constructor or the managed
		// constructors on subclasses that call this constructor.
		// this._fullyInitialized = true;
	}

	SafeHandleDestructor() {
		this.Dispose();
	}
	public Dispose(): void {
		this.InternalFinalize();
	}
	InternalFinalize() {
		throw new Error('Method not implemented.');
	}

	protected SetHandle(handle: IntPtr): void {
		this.handle = handle;
	}
}
