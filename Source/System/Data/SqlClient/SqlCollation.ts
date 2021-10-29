import { SqlCompareOptions, SqlString } from '../SqlTypes/SQLString';

export class SqlCollation {
	// First 20 bits of info field represent the lcid, bits 21-25 are compare options
	private readonly IgnoreCase: uint = 1 << 20; // bit 21 - IgnoreCase
	private readonly IgnoreNonSpace: uint = 1 << 21; // bit 22 - IgnoreNonSpace / IgnoreAccent
	private readonly IgnoreWidth: uint = 1 << 22; // bit 23 - IgnoreWidth
	private readonly IgnoreKanaType: uint = 1 << 23; // bit 24 - IgnoreKanaType
	private readonly BinarySort: uint = 1 << 24; // bit 25 - BinarySort

	public readonly MaskLcid: uint = 0xfffff;
	private readonly LcidVersionBitOffset: int = 28;
	private readonly MaskLcidVersion: uint = 0xf << this.LcidVersionBitOffset;
	private readonly MaskCompareOpt: uint =
		this.IgnoreCase | this.IgnoreNonSpace | this.IgnoreWidth | this.IgnoreKanaType | this.BinarySort;

	public info: uint;
	public sortId: byte;

	private static FirstSupportedCollationVersion(lcid: number) {
		// NOTE: switch-case works ~3 times faster in this case than search with Dictionary
		switch (lcid) {
			case 1044:
				return 2; // Norwegian_100_BIN
			case 1047:
				return 2; // Romansh_100_BIN
			case 1056:
				return 2; // Urdu_100_BIN
			case 1065:
				return 2; // Persian_100_BIN
			case 1068:
				return 2; // Azeri_Latin_100_BIN
			case 1070:
				return 2; // Upper_Sorbian_100_BIN
			case 1071:
				return 1; // ----n_FYROM_90_BIN
			case 1081:
				return 1; // Indic_General_90_BIN
			case 1082:
				return 2; // Maltese_100_BIN
			case 1083:
				return 2; // Sami_Norway_100_BIN
			case 1087:
				return 1; // Kazakh_90_BIN
			case 1090:
				return 2; // Turkmen_100_BIN
			case 1091:
				return 1; // Uzbek_Latin_90_BIN
			case 1092:
				return 1; // Tatar_90_BIN
			case 1093:
				return 2; // Bengali_100_BIN
			case 1101:
				return 2; // Assamese_100_BIN
			case 1105:
				return 2; // Tibetan_100_BIN
			case 1106:
				return 2; // Welsh_100_BIN
			case 1107:
				return 2; // Khmer_100_BIN
			case 1108:
				return 2; // Lao_100_BIN
			case 1114:
				return 1; // Syriac_90_BIN
			case 1121:
				return 2; // Nepali_100_BIN
			case 1122:
				return 2; // Frisian_100_BIN
			case 1123:
				return 2; // Pashto_100_BIN
			case 1125:
				return 1; // Divehi_90_BIN
			case 1133:
				return 2; // Bashkir_100_BIN
			case 1146:
				return 2; // Mapudungan_100_BIN
			case 1148:
				return 2; // Mohawk_100_BIN
			case 1150:
				return 2; // Breton_100_BIN
			case 1152:
				return 2; // Uighur_100_BIN
			case 1153:
				return 2; // Maori_100_BIN
			case 1155:
				return 2; // Corsican_100_BIN
			case 1157:
				return 2; // Yakut_100_BIN
			case 1164:
				return 2; // Dari_100_BIN
			case 2074:
				return 2; // Serbian_Latin_100_BIN
			case 2092:
				return 2; // Azeri_Cyrillic_100_BIN
			case 2107:
				return 2; // Sami_Sweden_Finland_100_BIN
			case 2143:
				return 2; // Tamazight_100_BIN
			case 3076:
				return 1; // Chinese_Hong_Kong_Stroke_90_BIN
			case 3098:
				return 2; // Serbian_Cyrillic_100_BIN
			case 5124:
				return 2; // Chinese_Traditional_Pinyin_100_BIN
			case 5146:
				return 2; // Bosnian_Latin_100_BIN
			case 8218:
				return 2; // Bosnian_Cyrillic_100_BIN

			default:
				return 0; // other LCIDs have collation with version 0
		}
	}

	public get LCID() {
		return <int>(this.info & this.MaskLcid);
	}
	public set LCID(value: number) {
		const lcid: int = value & this.MaskLcid;
		console.assert(lcid == value, 'invalid set_LCID value');

		// VSTFDEVDIV 479474: some new Katmai LCIDs do not have collation with version = 0
		// since user has no way to specify collation version, we set the first (minimal) supported version for these collations
		const versionBits: int = SqlCollation.FirstSupportedCollationVersion(lcid) << this.LcidVersionBitOffset;
		console.assert((versionBits & this.MaskLcidVersion) == versionBits, 'invalid version returned by FirstSupportedCollationVersion');

		// combine the current compare options with the new locale ID and its first supported version
		this.info = (this.info & this.MaskCompareOpt) | lcid | versionBits;
	}

	public get SqlCompareOptions() {
		let options: SqlCompareOptions = SqlCompareOptions.None;
		if (0 != (this.info & this.IgnoreCase)) options |= SqlCompareOptions.IgnoreCase;
		if (0 != (this.info & this.IgnoreNonSpace)) options |= SqlCompareOptions.IgnoreNonSpace;
		if (0 != (this.info & this.IgnoreWidth)) options |= SqlCompareOptions.IgnoreWidth;
		if (0 != (this.info & this.IgnoreKanaType)) options |= SqlCompareOptions.IgnoreKanaType;
		if (0 != (this.info & this.BinarySort)) options |= SqlCompareOptions.BinarySort;
		return options;
	}

	public set SqlCompareOptions(value: SqlCompareOptions) {
		console.assert((value & SqlString.x_iValidSqlCompareOptionMask) == value, 'invalid set_SqlCompareOptions value');
		let tmp: uint = 0;
		if (0 != (value & SqlCompareOptions.IgnoreCase)) tmp |= this.IgnoreCase;
		if (0 != (value & SqlCompareOptions.IgnoreNonSpace)) tmp |= this.IgnoreNonSpace;
		if (0 != (value & SqlCompareOptions.IgnoreWidth)) tmp |= this.IgnoreWidth;
		if (0 != (value & SqlCompareOptions.IgnoreKanaType)) tmp |= this.IgnoreKanaType;
		if (0 != (value & SqlCompareOptions.BinarySort)) tmp |= this.BinarySort;
		this.info = (this.info & this.MaskLcid) | tmp;
	}

	public TraceString(): string {
		return `(LCID=${this.LCID}, Opts=${this.SqlCompareOptions})`;
	}

	public static AreSame(a: SqlCollation, b: SqlCollation): boolean {
		if (a == null || b == null) {
			return a == b;
		}
		return a.info == b.info && a.sortId == b.sortId;
	}
}
