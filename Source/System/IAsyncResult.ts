// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Interface: IAsyncResult
**
** Purpose: Interface to encapsulate the results of an async
**          operation
**
===========================================================*/

import { WaitHandle } from './Threading/WaitHandle';

export interface IAsyncResult {
	IsCompleted: bool;

	AsyncWaitHandle: WaitHandle;

	AsyncState: Object;

	CompletedSynchronously: bool;
}
