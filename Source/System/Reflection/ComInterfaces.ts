// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
// <OWNER>WESU</OWNER>

import { Guid } from '../Guid';

export interface _ParameterInfo {
	GetTypeInfoCount(): [uint];
	GetTypeInfo(iTInfo: uint, lcid: uint, ppTInfo: IntPtr): void;
	GetIDsOfNames(riid: Guid, rgszNames: IntPtr, cNames: uint, lcid: uint, rgDispId: IntPtr): void;
	Invoke(
		dispIdMember: uint,
		riid: Guid,
		lcid: uint,
		wFlags: short,
		pDispParams: IntPtr,
		pVarResult: IntPtr,
		pExcepInfo: IntPtr,
		puArgEr: IntPtr,
	): void;
}
