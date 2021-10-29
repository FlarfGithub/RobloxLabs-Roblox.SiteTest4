// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==

// The IComparable interface is implemented by classes that support an
// ordering of instances of the class. The ordering represented by
// IComparable can be used to sort arrays and collections of objects
// that implement the interface.
//
export interface IComparable {
	// Interface does not need to be marked with the serializable attribute
	// Compares this object to another object, returning an integer that
	// indicates the relationship. An implementation of this method must return
	// a value less than zero if this is less than object, zero
	// if this is equal to object, or a value greater than zero
	// if this is greater than object.
	//
	CompareTo(obj: Object): int;
}

// Generic version of IComparable.

export interface IComparableGeneric<T> {
	// Interface does not need to be marked with the serializable attribute
	// Compares this object to another object, returning an integer that
	// indicates the relationship. An implementation of this method must return
	// a value less than zero if this is less than object, zero
	// if this is equal to object, or a value greater than zero
	// if this is greater than object.
	//
	CompareTo(obj: T): int;
}
