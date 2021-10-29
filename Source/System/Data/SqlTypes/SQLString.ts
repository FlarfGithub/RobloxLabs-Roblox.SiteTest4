// import { ArgumentException } from '../../ArgumentException';
// import { CompareInfo, CompareOptions } from '../../Globalization/CompareInfo';
// import { CultureInfo } from '../../Globalization/CultureInfo';
// import { IComparable } from '../../IComparable';
// import { IXmlSerializable } from '../../Xml/Serialization/IXmlSerializable';
// import { INullable } from './INullable';

export enum SqlCompareOptions {
	None = 0x00000000,
	IgnoreCase = 0x00000001,
	IgnoreNonSpace = 0x00000002,
	IgnoreKanaType = 0x00000008, // ignore kanatype
	IgnoreWidth = 0x00000010, // ignore width
	BinarySort = 0x00008000, // binary sorting
	BinarySort2 = 0x00004000, // binary sorting 2
}

export class SqlString /* implements */ /* INullable, */ /* IComparable, */ /* IXmlSerializable */ {
	// private m_value: String;
	// private m_cmpInfo: CompareInfo;
	// private m_lcid: int; // Locale Id
	// private m_flag: SqlCompareOptions; // Compare flags
	// private m_fNotNull: bool; // false if null

	/// <devdoc>
	///    <para>
	///       Represents a null value that can be assigned to the <see cref='System.Data.SqlTypes.SqlString.Value'/> property of an instance of
	///       the <see cref='System.Data.SqlTypes.SqlString'/> class.
	///    </para>
	/// </devdoc>
	public static readonly Null: SqlString = new SqlString(/* true */);

	/// <devdoc>
	/// </devdoc>
	public static readonly IgnoreCase: int = 0x1;
	/// <devdoc>
	/// </devdoc>
	public static readonly IgnoreWidth: int = 0x10;
	/// <devdoc>
	/// </devdoc>
	public static readonly IgnoreNonSpace: int = 0x2;
	/// <devdoc>
	/// </devdoc>
	public static readonly IgnoreKanaType: int = 0x8;
	/// <devdoc>
	/// </devdoc>
	public static readonly BinarySort: int = 0x8000;
	/// <devdoc>
	/// </devdoc>
	public static readonly BinarySort2: int = 0x4000;

	// private static readonly x_iDefaultFlag: SqlCompareOptions =
	// 	SqlCompareOptions.IgnoreCase | SqlCompareOptions.IgnoreKanaType | SqlCompareOptions.IgnoreWidth;
	// private static readonly x_iValidCompareOptionMask: CompareOptions =
	// 	CompareOptions.IgnoreCase | CompareOptions.IgnoreWidth | CompareOptions.IgnoreNonSpace | CompareOptions.IgnoreKanaType;

	public static readonly x_iValidSqlCompareOptionMask: SqlCompareOptions =
		SqlCompareOptions.IgnoreCase |
		SqlCompareOptions.IgnoreWidth |
		SqlCompareOptions.IgnoreNonSpace |
		SqlCompareOptions.IgnoreKanaType |
		SqlCompareOptions.BinarySort |
		SqlCompareOptions.BinarySort2;

	public static readonly x_lcidUSEnglish: int = 0x00000409;
	// private static readonly x_lcidBinary: int = 0x00008200;
	x_UnicodeEncoding: any;

	// private constructor(fNull: bool) {
	// 	this.m_value = null;
	// 	this.m_cmpInfo = null;
	// 	this.m_lcid = 0;
	// 	this.m_flag = SqlCompareOptions.None;
	// 	this.m_fNotNull = false;
	// }

	// public SqlString(lcid: int, compareOptions: SqlCompareOptions, data: byte[], index: int, count: int, fUnicode: bool) {
	// 	const str = new SqlString(false);
	// 	str.m_lcid = lcid;
	// 	SqlString.ValidateSqlCompareOptions(compareOptions);
	// 	str.m_flag = compareOptions;
	// 	if (data == null) {
	// 		str.m_fNotNull = false;
	// 		str.m_value = null;
	// 		str.m_cmpInfo = null;
	// 	} else {
	// 		str.m_fNotNull = true;

	// 		// m_cmpInfo is set lazily, so that we don't need to pay the cost
	// 		// unless the string is used in comparison.
	// 		str.m_cmpInfo = null;

	// 		if (fUnicode) {
	// 			str.m_value = str.x_UnicodeEncoding.GetString(data, index, count);
	// 		} else {
	// 			const culInfo = new CultureInfo(this.m_lcid);
	// 			const cpe = System.Text.Encoding.GetEncoding(culInfo.TextInfo.ANSICodePage);
	// 			str.m_value = cpe.GetString(data, index, count);
	// 		}
	// 	}
	// 	return str;
	// }

	// Utility functions and constants

	// private static ValidateSqlCompareOptions(compareOptions: SqlCompareOptions): void {
	// 	if ((compareOptions & SqlString.x_iValidSqlCompareOptionMask) != compareOptions) throw new ArgumentException('compareOptions');
	// }
}
