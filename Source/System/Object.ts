// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Class:  Object
**
**
** Object is the root class for all CLR objects.  This class
** defines only the basics.
**
** 
===========================================================*/

// The Object is the root class for all object in the CLR System. Object
// is the super class for all other CLR objects and provide a set of methods and low level
// services to subclasses.  These services include object synchronization and support for clone
// operations.
//
//This class contains no data and does not need to be serializable
export class Object {
	// Creates a new instance of an Object.
	public constructor() {}

	// Returns a String which represents the object instance.  The default
	// for an object is to return the fully qualified name of the class.
	//
	public ToString(): String {
		return '';
	}

	// Returns a boolean indicating if the passed in object obj is
	// Equal to this.  Equality is defined as object equality for reference
	// types and bitwise equality for value types using a loader trick to
	// replace Equals with EqualsValue for value types).
	//

	public Equals(obj: Object): bool {
		return this === obj;
	}

	public static Equals(objA: Object, objB: Object): bool {
		if (objA == objB) {
			return true;
		}
		if (objA == null || objB == null) {
			return false;
		}
		return objA.Equals(objB);
	}

	public static ReferenceEquals(objA: Object, objB: Object): bool {
		return objA == objB;
	}

	// GetHashCode is intended to serve as a hash function for this object.
	// Based on the contents of the object, the hash function will return a suitable
	// value with a relatively random distribution over the various inputs.
	//
	// The default implementation returns the sync block index for this instance.
	// Calling it on the same object multiple times will return the same value, so
	// it will technically meet the needs of a hash function, but it's less than ideal.
	// Objects (& especially value classes) should override this method.
	//
	public GetHashCode(): int {
		return 0;
	}

	// Sets the value specified in the variant on the field
	//
	protected FieldSetter(typeName: String, fieldName: String, val: Object): void {}
}
