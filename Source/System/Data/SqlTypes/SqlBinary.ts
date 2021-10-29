// import { IComparable } from 'System/IComparable';
// import { IXmlSerializable } from 'System/Xml/Serialization/IXmlSerializable';
// import { INullable } from './INullable';

export class SqlBinary /* implements INullable, IComparable, IXmlSerializable */ {
	Length: number;
	private constructor(fNull: bool);

	private constructor(value: byte[]);

	private constructor(value?: byte[] | bool, fNull?: bool) {}
}
