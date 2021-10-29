// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Interface:  IDictionary
** 
** <OWNER>kimhamil</OWNER>
**
**
** Purpose: Base interface for all dictionaries.
**
** 
===========================================================*/

import { ICollectionBase } from './ICollectionBase';

// An IDictionary is a possibly unordered set of key-value pairs.
// Keys can be any non-null object.  Values can be any object.
// You can look up a value in an IDictionary via the default indexed
// property, Items.
export interface IDictionary extends ICollectionBase {
	// Interfaces are not serializable
	// The Item property provides methods to read and edit entries
	// in the Dictionary.
	[key: string]: Object;

	// Returns a collections of the keys in this dictionary.
	Keys: ICollectionBase;

	// Returns a collections of the values in this dictionary.
	Values: ICollectionBase;

	// Returns whether this dictionary contains a particular key.
	//
	Contains(key: Object): bool;

	// Adds a key-value pair to the dictionary.
	//
	Add(key: Object, value: Object): void;

	// Removes all pairs from the dictionary.
	Clear(): void;

	IsReadOnly: bool;

	IsFixedSize: bool;

	// Removes a particular key from the dictionary.
	//
	Remove(key: Object): void;
}
