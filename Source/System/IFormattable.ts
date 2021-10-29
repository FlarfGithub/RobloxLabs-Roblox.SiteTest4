// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==

import { IFormatProvider } from './IFormatProvider';
import { NotImplementedException } from './NotImplementedException';

export interface IFormattable {
	ToString(format: String, formatProvider: IFormatProvider): String;
}

export abstract class IFormattableContract implements IFormattable {
	ToString(format: String, formatProvider: IFormatProvider): String {
		throw new NotImplementedException();
	}
}
