// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Interface:  IEqualityComparer
**
** <OWNER>kimhamil</OWNER>
** 
**
** Purpose: A mechanism to expose a simplified infrastructure for 
**          Comparing objects in collections.
**
** 
===========================================================*/

// An IEqualityComparer is a mechanism to consume custom performant comparison infrastructure
// that can be consumed by some of the common collections.
export interface IEqualityComparer {
	Equals(x: Object, y: Object): bool;
	GetHashCode(obj: Object): int;
}
