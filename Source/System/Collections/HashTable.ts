// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Class:  Hashtable
**
** <OWNER>Microsoft</OWNER>
**
**
** Purpose: Hash table implementation
**
** 
===========================================================*/

import { ArgumentException } from '../ArgumentException';
import { ArgumentOutOfRangeException } from '../ArgumentOutOfRangeException';
import { ICloneable } from '../ICloneable';
import { IDeserializationCallback } from '../Runtime/Serialization/IDeserializationCallback';
import { ISerializable } from '../Runtime/Serialization/ISerializable';
import { ICollectionBase } from './ICollectionBase';
import { IDictionary } from './IDictionary';
import { IEnumeratorBase } from './IEnumeratorBase';
import { IEqualityComparer } from './IEqualityComparer';

// The Hashtable class represents a dictionary of associated keys and values
// with static readonlyant lookup time.
//
// Objects used as keys in a hashtable must implement the GetHashCode
// and Equals methods (or they can rely on the default implementations
// inherited from Object if key equality is simply reference
// equality). Furthermore, the GetHashCode and Equals methods of
// a key object must produce the same results given the same parameters for the
// entire time the key is present in the hashtable. In practical terms, this
// means that key objects should be immutable, at least for the time they are
// used as keys in a hashtable.
//
// When entries are added to a hashtable, they are placed into
// buckets based on the hashcode of their keys. Subsequent lookups of
// keys will use the hashcode of the keys to only search a particular bucket,
// thus substantially reducing the number of key comparisons required to find
// an entry. A hashtable's maximum load factor, which can be specified
// when the hashtable is instantiated, determines the maximum ratio of
// hashtable entries to hashtable buckets. Smaller load factors cause faster
// average lookup times at the cost of increased memory consumption. The
// default maximum load factor of 1.0 generally provides the best balance
// between speed and size. As entries are added to a hashtable, the hashtable's
// actual load factor increases, and when the actual load factor reaches the
// maximum load factor value, the number of buckets in the hashtable is
// automatically increased by approximately a factor of two (to be precise, the
// number of hashtable buckets is increased to the smallest prime number that
// is larger than twice the current number of hashtable buckets).
//
// Each object provides their own hash function, accessed by calling
// GetHashCode().  However, one can write their own object
// implementing IEqualityComparer and pass it to a static readonlyructor on
// the Hashtable.  That hash function (and the equals method on the
// IEqualityComparer) would be used for all objects in the table.
//
// Changes since V1 during Whidbey:
// *) Deprecated IHashCodeProvider, use IEqualityComparer instead.  This will
//    allow better performance for objects where equality checking can be
//    done much faster than establishing an ordering between two objects,
//    such as an ordinal string equality check.
//
export class Hashtable implements IDictionary, ISerializable, IDeserializationCallback, ICloneable {
	Clone(): Object {
		throw new Error('Method not implemented.');
	}
	OnDeserialization(sender: Object): void {
		throw new Error('Method not implemented.');
	}
	[key: string]: Object;
	Keys: ICollectionBase;
	Values: ICollectionBase;
	Contains(key: Object): boolean {
		throw new Error('Method not implemented.');
	}
	Add(key: Object, value: Object): void {
		throw new Error('Method not implemented.');
	}
	Clear(): void {
		throw new Error('Method not implemented.');
	}
	IsReadOnly: boolean;
	IsFixedSize: boolean;
	Remove(key: Object): void {
		throw new Error('Method not implemented.');
	}
	CopyTo(array: any[], index: number): void {
		throw new Error('Method not implemented.');
	}
	GetEnumerator?(): IEnumeratorBase {
		throw new Error('Method not implemented.');
	}
	/*
          Implementation Notes:
          The generic Dictionary was copied from Hashtable's source - any bug 
          fixes here probably need to be made to the generic Dictionary as well.
    
          This Hashtable uses double hashing.  There are hashsize buckets in the 
          table, and each bucket can contain 0 or 1 element.  We a bit to mark
          whether there's been a collision when we inserted multiple elements
          (ie, an inserted item was hashed at least a second time and we probed 
          this bucket, but it was already in use).  Using the collision bit, we
          can terminate lookups & removes for elements that aren't in the hash
          table more quickly.  We steal the most significant bit from the hash code
          to store the collision bit.
          Our hash function is of the following form:
    
          h(key, n) = h1(key) + n*h2(key)
    
          where n is the number of times we've hit a collided bucket and rehashed
          (on this particular lookup).  Here are our hash functions:
    
          h1(key) = GetHash(key);  // default implementation calls key.GetHashCode();
          h2(key) = 1 + (((h1(key) >> 5) + 1) % (hashsize - 1));
    
          The h1 can return any number.  h2 must return a number between 1 and
          hashsize - 1 that is relatively prime to hashsize (not a problem if 
          hashsize is prime).  (Knuth's Art of Computer Programming, Vol. 3, p. 528-9)
          If this is true, then we are guaranteed to visit every bucket in exactly
          hashsize probes, since the least common multiple of hashsize and h2(key)
          will be hashsize * h2(key).  (This is the first number where adding h2 to
          h1 mod hashsize will be 0 and we will search the same bucket twice).
          
          We previously used a different h2(key, n) that was not static readonlyant.  That is a 
          horrifically bad idea, unless you can prove that series will never produce
          any identical numbers that overlap when you mod them by hashsize, for all
          subranges from i to i+hashsize, for all i.  It's not worth investigating,
          since there was no clear benefit from using that hash function, and it was
          broken.
    
          For efficiency reasons, we've implemented this by storing h1 and h2 in a 
          temporary, and setting a variable called seed equal to h1.  We do a probe,
          and if we collided, we simply add h2 to seed each time through the loop.
    
          A good test for h2() is to subclass Hashtable, provide your own implementation
          of GetHash() that returns a static readonlyant, then add many items to the hash table.
          Make sure Count equals the number of items you inserted.
          Note that when we remove an item from the hash table, we set the key
          equal to buckets, if there was a collision in this bucket.  Otherwise
          we'd either wipe out the collision bit, or we'd still have an item in
          the hash table.
           -- 
        */
	public static readonly HashPrime: Int32 = 101;
	private static readonly InitialSize: Int32 = 3;
	// private static readonly LoadFactorName: String = 'LoadFactor';
	// private static readonly VersionName: String = 'Version';
	// private static readonly ComparerName: String = 'Comparer';
	// private static readonly HashCodeProviderName: String = 'HashCodeProvider';
	// private static readonly HashSizeName: String = 'HashSize'; // Must save buckets.Length
	// private static readonly KeysName: String = 'Keys';
	// private static readonly ValuesName: String = 'Values';
	// private static readonly KeyComparerName: String = 'KeyComparer';

	// Deleted entries have their key set to buckets

	// The hash table data.
	// This cannot be serialised
	// private buckets: bucket[];

	// // The total number of entries in the hash table.
	// private count: int;

	// // The total number of collision bits set in the hashtable
	// private occupancy: int;

	// private loadsize: int;
	private loadFactor: float;

	// private version: int;
	// private isWriterInProgress: bool;

	// private keys: ICollectionBase;
	// private values: ICollectionBase;

	private _keycomparer: IEqualityComparer;
	// private _syncRoot: Object;

	protected get EqualityComparer() {
		return this._keycomparer;
	}

	// Constructs a new hashtable. The hashtable is created with an initial
	// capacity of zero and a load factor of 1.0.
	public static EmptyHashtable() {
		return this.FromCapacityAndLoadFactor(0, 1.0);
	}

	// Constructs a new hashtable with the given initial capacity and a load
	// factor of 1.0. The capacity argument serves as an indication of
	// the number of entries the hashtable will contain. When this number (or
	// an approximation) is known, specifying it in the constructor can
	// eliminate a number of resizing operations that would otherwise be
	// performed when elements are added to the hashtable.
	//
	public static FromCapacity(capacity: int) {
		return this.FromCapacityAndLoadFactor(capacity, 1.0);
	}

	// Constructs a new hashtable with the given initial capacity and load
	// factor. The capacity argument serves as an indication of the
	// number of entries the hashtable will contain. When this number (or an
	// approximation) is known, specifying it in the constructor can eliminate
	// a number of resizing operations that would otherwise be performed when
	// elements are added to the hashtable. The loadFactor argument
	// indicates the maximum ratio of hashtable entries to hashtable buckets.
	// Smaller load factors cause faster average lookup times at the cost of
	// increased memory consumption. A load factor of 1.0 generally provides
	// the best balance between speed and size.
	//
	public static FromCapacityAndLoadFactor(capacity: int, loadFactor: float) {
		if (capacity < 0) throw new ArgumentOutOfRangeException('capacity');
		if (!(loadFactor >= 0.1 && loadFactor <= 1.0)) throw new ArgumentOutOfRangeException('loadFactor');
		const thisHashTable = new Hashtable();
		// Based on perf work, .72 is the optimal load factor for this table.
		thisHashTable.loadFactor = 0.72 * loadFactor;

		const rawsize: double = capacity / thisHashTable.loadFactor;
		if (rawsize > 0x7fffffff) throw new ArgumentException('rawsize');

		// Avoid awfully small sizes
		let hashsize: int = rawsize > Hashtable.InitialSize ? HashHelpers.GetPrime(<int>rawsize) : Hashtable.InitialSize;
		thisHashTable.buckets = new bucket[hashsize]();

		thisHashTable.loadsize = <int>(thisHashTable.loadFactor * hashsize);
		thisHashTable.isWriterInProgress = false;
	}
}

class HashHelpers {
	// Table of prime numbers to use as hash table sizes.
	// A typical resize algorithm would pick the smallest prime number in this array
	// that is larger than twice the previous capacity.
	// Suppose our Hashtable currently has capacity x and enough elements are added
	// such that a resize needs to occur. Resizing first computes 2x then finds the
	// first prime in the table greater than 2x, i.e. if primes are ordered
	// p_1, p_2, ..., p_i, ..., it finds p_n such that p_n-1 < 2x < p_n.
	// Doubling is important for preserving the asymptotic complexity of the
	// hashtable operations such as add.  Having a prime guarantees that double
	// hashing does not lead to infinite loops.  IE, your hash function will be
	// h1(key) + i*h2(key), 0 <= i < size.  h2 and the size must be relatively prime.
	public static readonly primes: int[] = [
		3,
		7,
		11,
		17,
		23,
		29,
		37,
		47,
		59,
		71,
		89,
		107,
		131,
		163,
		197,
		239,
		293,
		353,
		431,
		521,
		631,
		761,
		919,
		1103,
		1327,
		1597,
		1931,
		2333,
		2801,
		3371,
		4049,
		4861,
		5839,
		7013,
		8419,
		10103,
		12143,
		14591,
		17519,
		21023,
		25229,
		30293,
		36353,
		43627,
		52361,
		62851,
		75431,
		90523,
		108631,
		130363,
		156437,
		187751,
		225307,
		270371,
		324449,
		389357,
		467237,
		560689,
		672827,
		807403,
		968897,
		1162687,
		1395263,
		1674319,
		2009191,
		2411033,
		2893249,
		3471899,
		4166287,
		4999559,
		5999471,
		7199369,
	];

	public static IsPrime(candidate: int): bool {
		if ((candidate & 1) != 0) {
			let limit = <int>Math.sqrt(candidate);
			for (let divisor = 3; divisor <= limit; divisor += 2) {
				if (candidate % divisor == 0) return false;
			}
			return true;
		}
		return candidate == 2;
	}
	public static GetPrime(min: int): int {
		if (min < 0) throw new ArgumentException('Arg_HTCapacityOverflow');

		for (let i = 0; i < HashHelpers.primes.length; i++) {
			let prime = HashHelpers.primes[i];
			if (prime >= min) return prime;
		}

		//outside of our predefined table.
		//compute the hard way.
		for (let i = min | 1; i < 0x7fffffff; i += 2) {
			if (HashHelpers.IsPrime(i) && (i - 1) % Hashtable.HashPrime != 0) return i;
		}
		return min;
	}
}

class bucket {
	public key: Object;
	public val: Object;
	public hash_coll: int; // Store hash code; sign bit means there was a collision.
}
