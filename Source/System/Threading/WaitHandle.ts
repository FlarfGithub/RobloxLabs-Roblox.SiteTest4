/* @ts-ignore */

import { SafeWaitHandle } from '../../Microsoft/Win32/SafeHandles/SafeWaitHandle';
import { IDisposable } from '../IDisposable';

export enum OpenExistingResult {
	Success,
	NameNotFound,
	PathNotFound,
	NameInvalid,
}

export abstract class WaitHandle implements IDisposable {
	public static readonly WaitTimeout: int = 0x102;

	// private static readonly MAX_WAITHANDLES: int = 64;

	public safeWaitHandle: any; // TODO Implement

	public hasThreadAffinity: bool;

	private static GetInvalidHandle(): IntPtr {
		return /* Win32Native.INVALID_HANDLE_VALUE */ 1;
	}

	protected static readonly InvalidHandle: IntPtr = WaitHandle.GetInvalidHandle();

	// private static readonly WAIT_OBJECT_0: int = 0;
	// private static readonly WAIT_ABANDONED: int = 0x80;
	// private static readonly WAIT_FAILED: int = 0x7fffffff;
	// private static readonly ERROR_TOO_MANY_POSTS: int = 0x12a;

	protected constructor() {
		this.Init();
	}
	Dispose(): void {
		throw new Error('Method not implemented.');
	}

	private Init(): void {
		this.safeWaitHandle = null;
		// this.waitHandle = WaitHandle.InvalidHandle;
		this.hasThreadAffinity = false;
	}

	public get Handle(): IntPtr {
		return this.safeWaitHandle == null ? WaitHandle.InvalidHandle : this.safeWaitHandle.DangerousGetHandle();
	}

	public set Handle(value: IntPtr) {
		if (value == WaitHandle.InvalidHandle) {
			// This line leaks a handle.  However, it's currently
			// not perfectly clear what the right behavior is here
			// anyways.  This preserves Everett behavior.  We should
			// ideally do these things:
			// *) Expose a settable SafeHandle property on WaitHandle.
			// *) Expose a settable OwnsHandle property on SafeHandle.
			// We're looking into this.   -- Microsoft
			if (this.safeWaitHandle != null) {
				this.safeWaitHandle.SetHandleAsInvalid();
				this.safeWaitHandle = null;
			}
		} else {
			this.safeWaitHandle = new SafeWaitHandle(/* value, true */);
		}
		// this.waitHandle = value;
	}

	// private waitHandle: IntPtr;
}
