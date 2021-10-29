import { ArgumentNullException } from '../../ArgumentNullException';
import { Type } from '../../Type';
import { IFormatterConverter } from './IFormatterConverter';

export class SerializationInfo {
	public constructor(type: Type, converter: IFormatterConverter, requireSameTokenInPartialTrust?: bool) {
		if (type === null) throw new ArgumentNullException('type');
		if (converter === null) throw new ArgumentNullException('converter');
		this.objectType = type;
		this.m_assemName = '';
		this.m_members = [];
		this.m_data = [];
		this.m_types = [];
		this.m_converter = converter;
		this.requireSameTokenInPartialTrust = requireSameTokenInPartialTrust;
	}

	public get AssemblyName() {
		return this.m_assemName;
	}
	public set AssemblyName(value: string) {
		if (value == null) throw new ArgumentNullException('value');
		if (this.requireSameTokenInPartialTrust) {
			SerializationInfo.DemandForUnsafeAssemblyNameAssignments(this.m_assemName, value);
		}
		this.m_assemName = value;
		this.isAssemblyNameSetExplicit = true;
	}

	public get IsAssemblyNameSetExplicit() {
		return this.isAssemblyNameSetExplicit;
	}

	public get IsFullTypeNameSetExplicit() {
		return this.isFullTypeNameSetExplicit;
	}

	public get MemberCount() {
		return this.m_currMember;
	}

	public get MemberNames() {
		return this.m_members;
	}

	public get MemberValues() {
		return this.m_data;
	}

	public get ObjectType() {
		return this.objectType;
	}

	public static DemandForUnsafeAssemblyNameAssignments(originalAssemblyName: string, newAssemblyName: string): void {}

	private isAssemblyNameSetExplicit: bool;

	private isFullTypeNameSetExplicit: bool;

	private m_assemName: string;

	public m_converter: IFormatterConverter;

	public m_currMember: int;

	public m_data: any[];

	public m_members: string[];

	public m_types: Type[];

	private objectType: Type;

	private requireSameTokenInPartialTrust: bool;
}
