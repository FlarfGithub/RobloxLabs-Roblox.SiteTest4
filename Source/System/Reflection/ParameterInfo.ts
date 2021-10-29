// ==++==
//
//   Copyright(c) Microsoft Corporation.  All rights reserved.
//
// ==--==
// <OWNER>Microsoft</OWNER>
//

import { Guid } from '../Guid';
import { Type } from '../Type';
import { _ParameterInfo } from './ComInterfaces';
import { ICustomAttributeProvider } from './ICustomAttributeProvider';

export class ParameterInfo implements _ParameterInfo, ICustomAttributeProvider {
	GetCustomAttributes(inherit?: bool): any[] {
		throw new Error('Method not implemented.');
	}
	IsDefined(attributeType: Type, inherit: boolean): boolean {
		throw new Error('Method not implemented.');
	}
	GetTypeInfoCount(): [number] {
		throw new Error('Method not implemented.');
	}
	GetTypeInfo(iTInfo: number, lcid: number, ppTInfo: number): void {
		throw new Error('Method not implemented.');
	}
	GetIDsOfNames(riid: Guid, rgszNames: number, cNames: number, lcid: number, rgDispId: number): void {
		throw new Error('Method not implemented.');
	}
	Invoke(
		dispIdMember: number,
		riid: Guid,
		lcid: number,
		wFlags: number,
		pDispParams: number,
		pVarResult: number,
		pExcepInfo: number,
		puArgEr: number,
	): void {
		throw new Error('Method not implemented.');
	}
}
