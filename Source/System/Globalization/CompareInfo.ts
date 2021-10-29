import { CultureInfo } from './CultureInfo';

export enum CompareOptions {
	None = 0x00000000,
	IgnoreCase = 0x00000001,
	IgnoreNonSpace = 0x00000002,
	IgnoreSymbols = 0x00000004,
	IgnoreKanaType = 0x00000008, // ignore kanatype
	IgnoreWidth = 0x00000010, // ignore width
	OrdinalIgnoreCase = 0x10000000, // This flag can not be used with other flags.
	StringSort = 0x20000000, // use string sort method
	Ordinal = 0x40000000, // This flag can not be used with other flags.

	// StopOnNull      = 0x10000000,

	// StopOnNull is defined in SortingTable.h, but we didn't enable this option here.
	// Do not use this value for other flags accidentally.
}

export class CompareInfo {
	// private readonly ValidIndexMaskOffFlags: CompareOptions = ~(
	// 	CompareOptions.IgnoreCase |
	// 	CompareOptions.IgnoreSymbols |
	// 	CompareOptions.IgnoreNonSpace |
	// 	CompareOptions.IgnoreWidth |
	// 	CompareOptions.IgnoreKanaType
	// );
	// private readonly ValidCompareMaskOffFlags: CompareOptions = ~(
	// 	CompareOptions.IgnoreCase |
	// 	CompareOptions.IgnoreSymbols |
	// 	CompareOptions.IgnoreNonSpace |
	// 	CompareOptions.IgnoreWidth |
	// 	CompareOptions.IgnoreKanaType |
	// 	CompareOptions.StringSort
	// );

	// // Mask used to check if GetHashCodeOfString() has the right flags.
	// private readonly ValidHashCodeOfStringMaskOffFlags: CompareOptions = ~(
	// 	CompareOptions.IgnoreCase |
	// 	CompareOptions.IgnoreSymbols |
	// 	CompareOptions.IgnoreNonSpace |
	// 	CompareOptions.IgnoreWidth |
	// 	CompareOptions.IgnoreKanaType
	// );

	// private m_name: String; // The name used to construct this CompareInfo

	// private m_sortName: String; // The name that defines our behavior

	// private m_dataHandle: IntPtr;

	// private m_handleOrigin: IntPtr;

	////////////////////////////////////////////////////////////////////////
	//
	//  CompareInfo Constructor
	//
	//
	////////////////////////////////////////////////////////////////////////
	// Constructs an instance that most closely corresponds to the NLS locale
	// identifier.
	public constructor(culture: CultureInfo) {
		// this.m_name = culture.m_name;
		// this.m_sortName = culture.SortName;
		// [this.m_dataHandle, this.m_handleOrigin] = InternalInitSortHandle(this.m_sortName);
	}
}
