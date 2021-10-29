// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Interface: IDeserializationEventListener
**
**
** Purpose: Implemented by any class that wants to indicate that
**          it wishes to receive deserialization events.
**
**
===========================================================*/

// Interface does not need to be marked with the serializable attribute
export interface IDeserializationCallback {
	OnDeserialization(sender: Object): void;
}
