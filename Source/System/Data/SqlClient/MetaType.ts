import { Type } from '../../Type';
import { DbType } from '../DbType';
import { SqlDbType } from '../SqlDbType';

export class MetaType {
	public constructor(
		precision: byte,
		scale: byte,
		fixedLength: int,
		isFixed: bool,
		isLong: bool,
		isPlp: bool,
		tdsType: byte,
		nullableTdsType: byte,
		typeName: string,
		classType: Type,
		sqlType: Type,
		sqldbType: SqlDbType,
		dbType: DbType,
		propBytes: byte,
	) {}

	public readonly ClassType: Type;

	public readonly SqlDbType: SqlDbType;

	public readonly DbType: DbType;

	public readonly FixedLength: int;

	public readonly Is100Supported: bool;

	public readonly Is70Supported: bool;

	public readonly Is80Supported: bool;

	public readonly Is90Supported: bool;

	public readonly IsAnsiType: bool;

	public readonly IsBinType: bool;

	public readonly IsCharType: bool;

	public readonly IsFixed: bool;

	public readonly IsLong: bool;

	public readonly IsNCharType: bool;

	public readonly IsNewKatmaiType: bool;

	public readonly IsPlp: bool;

	public readonly IsSizeInCharacters: bool;

	public readonly IsVarTime: bool;

	// private static readonly MetaBigInt: MetaType = new MetaType(
	// 	19,
	// 	0xff,
	// 	8,
	// 	true,
	// 	false,
	// 	false,
	// 	127,
	// 	38,
	// 	'bigint',
	// 	typeof 'long',
	// 	typeof 'SqlInt64',
	// 	SqlDbType.BigInt,
	// 	DbType.Int64,
	// 	0,
	// );

	// private static readonly MetaBinary: MetaType = new MetaType(
	// 	0xff,
	// 	-pageXOffset,
	// 	-1,
	// 	false,
	// 	false,
	// 	false,
	// 	173,
	// 	173,
	// 	'binary',
	// 	typeof 'byte',
	// 	typeof 'SqlBinary',
	// 	SqlDbType.Binary,
	// 	DbType.Binary,
	// 	2,
	// );

	// private static readonly MetaBit: MetaType = new MetaType(
	// 	0xff,
	// 	0xff,
	// 	1,
	// 	true,
	// 	false,
	// 	false,
	// 	50,
	// 	104,
	// 	'bit',
	// 	typeof 'bool',
	// 	typeof 'SqlBoolean',
	// 	SqlDbType.Bit,
	// 	DbType.Boolean,
	// 	0,
	// );
}
