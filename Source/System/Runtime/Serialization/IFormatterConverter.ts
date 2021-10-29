import { Type } from '../../Type';
import { TypeCode } from '../../TypeCode';

export interface IFormatterConverter {
	Convert(value: any, type: Type): any;

	Convert(value: any, type: TypeCode): any;

	ToBoolean(value: any): bool;

	ToChar(value: any): char;

	ToSByte(value: any): sbyte;

	ToByte(value: any): byte;

	ToInt16(value: any): short;

	ToUInt16(value: any): ushort;

	ToInt32(value: any): int;

	ToUInt32(value: any): uint;

	ToInt64(value: any): long;

	ToUInt64(value: any): ulong;

	ToSingle(value: any): float;

	ToDouble(value: any): double;

	ToDecimal(value: any): decimal;

	ToDateTime(object: any): DateTime;

	ToString(object: any): string;
}
