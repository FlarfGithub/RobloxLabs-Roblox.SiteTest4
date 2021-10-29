// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==

// The base class for all event classes.
export class EventArgs {
	public static readonly Empty: EventArgs = new EventArgs();

	public constructor() {}
}
