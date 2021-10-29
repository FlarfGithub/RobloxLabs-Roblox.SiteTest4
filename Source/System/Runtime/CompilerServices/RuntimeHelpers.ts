// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// RuntimeHelpers
//    This class defines a set of static methods that provide support for compilers.
//
// Date: April 2000
//

import { Object } from '../../Object';

export abstract class RuntimeHelpers {
	// GetObjectValue is intended to allow value classes to be manipulated as 'Object'
	// but have aliasing behavior of a value class.  The intent is that you would use
	// this function just before an assignment to a variable of type 'Object'.  If the
	// value being assigned is a mutable value class, then a shallow copy is returned
	// (because value classes have copy semantics), but otherwise the object itself
	// is returned.
	//
	// Note: VB calls this method when they're about to assign to an Object
	// or pass it as a parameter.  The goal is to make sure that boxed
	// value types work identical to unboxed value types - ie, they get
	// cloned when you pass them around, and are always passed by value.
	// Of course, reference types are not cloned.
	//
	public static GetObjectValue(obj: Object): Object {
		return;
	}
}
