// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
/*============================================================
**
** Interface:  ICustomFormatter
**
**
** Purpose: Marks a class as providing special formatting
**
**
===========================================================*/

import { IFormatProvider } from './IFormatProvider';

export interface ICustomFormatter {
	// Interface does not need to be marked with the serializable attribute
	Format(format: String, arg: Object, formatProvider: IFormatProvider): String;
}
