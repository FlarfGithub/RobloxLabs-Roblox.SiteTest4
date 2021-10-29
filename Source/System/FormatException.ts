// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Class:  FormatException
**
**
** Purpose: Exception to designate an illegal argument to FormatMessage.
**
** 
===========================================================*/

import { Exception } from './Exception';
import { SystemException } from './SystemException';

export class FormatException extends SystemException {
	public constructor();

	public constructor(message: string);
	public constructor(message: string, innerException: Exception);

	public constructor(message?: string, innerException?: Exception) {
		super(message, innerException);
	}
}
