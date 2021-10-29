// ==++==
//
//   Copyright (c) Microsoft Corporation.  All rights reserved.
//
// ==--==
import { ArgumentException } from './ArgumentException';
import { ArgumentNullException } from './ArgumentNullException';
import { Convert } from './Convert';
import { Exception } from './Exception';
import { FormatException } from './FormatException';
import { IComparable } from './IComparable';
import { IFormatProvider } from './IFormatProvider';
import { IFormattable } from './IFormattable';

// Represents a Globally Unique Identifier.
export class Guid implements IFormattable, IComparable {
	public static readonly Empty: Guid = new Guid();
	////////////////////////////////////////////////////////////////////////////////
	//  Member variables
	////////////////////////////////////////////////////////////////////////////////
	private _a: int;
	private _b: short;
	private _c: short;
	private _d: byte;
	private _e: byte;
	private _f: byte;
	private _g: byte;
	private _h: byte;
	private _i: byte;
	private _j: byte;
	private _k: byte;

	////////////////////////////////////////////////////////////////////////////////
	//  Constructors
	////////////////////////////////////////////////////////////////////////////////

	// Creates a new guid from an array of bytes.
	//
	public static FromByteArray(b: byte[]) {
		if (b == null) throw new ArgumentNullException('b');
		if (b.length != 16) throw new ArgumentException('b');
		const thisGuid = new Guid();
		thisGuid._a = ((<int>b[3]) << 24) | ((<int>b[2]) << 16) | ((<int>b[1]) << 8) | b[0];
		thisGuid._b = <short>(((<int>b[5]) << 8) | b[4]);
		thisGuid._c = <short>(((<int>b[7]) << 8) | b[6]);
		thisGuid._d = b[8];
		thisGuid._e = b[9];
		thisGuid._f = b[10];
		thisGuid._g = b[11];
		thisGuid._h = b[12];
		thisGuid._i = b[13];
		thisGuid._j = b[14];
		thisGuid._k = b[15];
		return thisGuid;
	}

	public static FromFullSet(a: uint, b: ushort, c: ushort, d: byte, e: byte, f: byte, g: byte, h: byte, i: byte, j: byte, k: byte) {
		const thisGuid = new Guid();
		thisGuid._a = <int>a;
		thisGuid._b = <short>b;
		thisGuid._c = <short>c;
		thisGuid._d = d;
		thisGuid._e = e;
		thisGuid._f = f;
		thisGuid._g = g;
		thisGuid._h = h;
		thisGuid._i = i;
		thisGuid._j = j;
		thisGuid._k = k;
		return thisGuid;
	}

	// Creates a new GUID initialized to the value represented by the arguments.
	//
	public static FromABCD(a: int, b: short, c: short, d: byte[]) {
		if (d == null) throw new ArgumentNullException('d');
		// Check that array is not too big
		if (d.length != 8) throw new ArgumentException('d');
		const thisGuid = new Guid();
		thisGuid._a = a;
		thisGuid._b = b;
		thisGuid._c = c;
		thisGuid._d = d[0];
		thisGuid._e = d[1];
		thisGuid._f = d[2];
		thisGuid._g = d[3];
		thisGuid._h = d[4];
		thisGuid._i = d[5];
		thisGuid._j = d[6];
		thisGuid._k = d[7];
		return thisGuid;
	}

	// Creates a new GUID initialized to the value represented by the
	// arguments.  The bytes are specified like this to avoid endianness issues.
	//
	public static FromFullSetSigned(a: int, b: short, c: short, d: byte, e: byte, f: byte, g: byte, h: byte, i: byte, j: byte, k: byte) {
		const thisGuid = new Guid();
		thisGuid._a = a;
		thisGuid._b = b;
		thisGuid._c = c;
		thisGuid._d = d;
		thisGuid._e = e;
		thisGuid._f = f;
		thisGuid._g = g;
		thisGuid._h = h;
		thisGuid._i = i;
		thisGuid._j = j;
		thisGuid._k = k;
		return thisGuid;
	}

	// Creates a new guid based on the value in the string.  The value is made up
	// of hex digits speared by the dash ("-"). The string may begin and end with
	// brackets ("{", "}").
	//
	// The string must be of the form dddddddd-dddd-dddd-dddd-dddddddddddd. where
	// d is a hex digit. (That is 8 hex digits, followed by 4, then 4, then 4,
	// then 12) such as: "CA761232-ED42-11CE-BACD-00AA0057B223"
	//
	public static FromString(g: string) {
		if (g == null) {
			throw new ArgumentNullException('g');
		}
		let thisGuid = new Guid();
		thisGuid = Guid.Empty;
		const result = new GuidResult();
		result.Init(GuidParseThrowStyle.All);
		if (Guid.TryParseGuid(g, GuidStyles.Any, result)) {
			thisGuid = result.parsedGuid;
		} else {
			throw result.GetGuidParseException();
		}

		return thisGuid;
	}

	public static Parse(input: string): Guid {
		if (input == null) {
			throw new ArgumentNullException('input');
		}

		const result = new GuidResult();
		result.Init(GuidParseThrowStyle.AllButOverflow);
		if (Guid.TryParseGuid(input, GuidStyles.Any, result)) {
			return result.parsedGuid;
		} else {
			throw result.GetGuidParseException();
		}
	}

	public static TryParse(input: string): [bool, Guid] {
		let result = new Guid();
		const parseResult = new GuidResult();
		parseResult.Init(GuidParseThrowStyle.None);
		if (Guid.TryParseGuid(input, GuidStyles.Any, parseResult)) {
			result = parseResult.parsedGuid;
			return [true, result];
		} else {
			result = Guid.Empty;
			return [false, result];
		}
	}

	public static ParseExact(input: String, format: String): Guid {
		if (input == null) throw new ArgumentNullException('input');

		if (format == null) throw new ArgumentNullException('format');

		if (format.length != 1) {
			// all acceptable format strings are of length 1
			throw new FormatException('Format_InvalidGuidFormatSpecification');
		}

		let style: GuidStyles;
		let formatCh = format[0];
		if (formatCh == 'D' || formatCh == 'd') {
			style = GuidStyles.DigitFormat;
		} else if (formatCh == 'N' || formatCh == 'n') {
			style = GuidStyles.NumberFormat;
		} else if (formatCh == 'B' || formatCh == 'b') {
			style = GuidStyles.BraceFormat;
		} else if (formatCh == 'P' || formatCh == 'p') {
			style = GuidStyles.ParenthesisFormat;
		} else if (formatCh == 'X' || formatCh == 'x') {
			style = GuidStyles.HexFormat;
		} else {
			throw new FormatException('Format_InvalidGuidFormatSpecification');
		}

		let result: GuidResult = new GuidResult();
		result.Init(GuidParseThrowStyle.AllButOverflow);
		if (Guid.TryParseGuid(input, style, result)) {
			return result.parsedGuid;
		} else {
			throw result.GetGuidParseException();
		}
	}

	public static TryParseExact(input: String, format: String): [bool, Guid] {
		let result = new Guid();
		if (format == null || format.length != 1) {
			result = Guid.Empty;
			return [false, result];
		}

		let style: GuidStyles;
		let formatCh = format[0];

		if (formatCh == 'D' || formatCh == 'd') {
			style = GuidStyles.DigitFormat;
		} else if (formatCh == 'N' || formatCh == 'n') {
			style = GuidStyles.NumberFormat;
		} else if (formatCh == 'B' || formatCh == 'b') {
			style = GuidStyles.BraceFormat;
		} else if (formatCh == 'P' || formatCh == 'p') {
			style = GuidStyles.ParenthesisFormat;
		} else if (formatCh == 'X' || formatCh == 'x') {
			style = GuidStyles.HexFormat;
		} else {
			// invalid guid format specification
			result = Guid.Empty;
			return [false, result];
		}

		let parseResult: GuidResult = new GuidResult();
		parseResult.Init(GuidParseThrowStyle.None);
		if (Guid.TryParseGuid(input, style, parseResult)) {
			result = parseResult.parsedGuid;
			return [true, result];
		} else {
			result = Guid.Empty;
			return [false, result];
		}
	}

	private static TryParseGuid(g: String, flags: GuidStyles, result: GuidResult): bool {
		if (g == null) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
			return false;
		}
		const guidString = g.trim(); //Remove Whitespace

		if (guidString.length == 0) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
			return false;
		}

		// Check for dashes
		const dashesExistInString = guidString.indexOf('-', 0) >= 0;

		if (dashesExistInString) {
			if ((flags & (GuidStyles.AllowDashes | GuidStyles.RequireDashes)) == 0) {
				// dashes are not allowed
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
				return false;
			}
		} else {
			if ((flags & GuidStyles.RequireDashes) != 0) {
				// dashes are required
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
				return false;
			}
		}

		// Check for braces
		const bracesExistInString = guidString.indexOf('{', 0) >= 0;

		if (bracesExistInString) {
			if ((flags & (GuidStyles.AllowBraces | GuidStyles.RequireBraces)) == 0) {
				// braces are not allowed
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
				return false;
			}
		} else {
			if ((flags & GuidStyles.RequireBraces) != 0) {
				// braces are required
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
				return false;
			}
		}

		// Check for parenthesis
		const parenthesisExistInString = guidString.indexOf('(', 0) >= 0;

		if (parenthesisExistInString) {
			if ((flags & (GuidStyles.AllowParenthesis | GuidStyles.RequireParenthesis)) == 0) {
				// parenthesis are not allowed
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
				return false;
			}
		} else {
			if ((flags & GuidStyles.RequireParenthesis) != 0) {
				// parenthesis are required
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidUnrecognized');
				return false;
			}
		}

		try {
			// let's get on with the parsing
			if (dashesExistInString) {
				// Check if it's of the form [{|(]dddddddd-dddd-dddd-dddd-dddddddddddd[}|)]
				return Guid.TryParseGuidWithDashes(guidString, result);
			} else if (bracesExistInString) {
				// Check if it's of the form {0xdddddddd,0xdddd,0xdddd,{0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd}}
				return Guid.TryParseGuidWithHexPrefix(guidString, result);
			} else {
				// Check if it's of the form dddddddddddddddddddddddddddddddd
				return Guid.TryParseGuidWithNoStyle(guidString, result);
			}
		} catch (ex) {
			result.SetFailure3(ParseFailureKind.FormatWithInnerException, 'Format_GuidUnrecognized', null, null, ex);
			return false;
		}
	}

	private static TryParseGuidWithHexPrefix(guidString: String, result: GuidResult): bool {
		let numStart = 0;
		let numLen = 0;

		// Eat all of the whitespace
		guidString = Guid.EatAllWhitespace(guidString);

		// Check for leading '{'
		if (Guid.IsNullOrEmpty(guidString) || guidString[0] != '{') {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidBrace');
			return false;
		}

		// Check for '0x'
		if (!Guid.IsHexPrefix(guidString, 1)) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidHexPrefix');
			return false;
		}

		// Find the end of this hex number (since it is not fixed length)
		numStart = 3;
		numLen = guidString.indexOf(',', numStart) - numStart;
		if (numLen <= 0) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidComma');
			return false;
		}

		const [success, _A] = Guid.StringToInt(guidString.substring(numStart, numLen) /*first DWORD*/, -1, Guid.IsTight, result);
		result.parsedGuid._a = _A;
		if (!success) return false;

		// Check for '0x'
		if (!Guid.IsHexPrefix(guidString, numStart + numLen + 1)) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidHexPrefix');
			return false;
		}

		// +3 to get by ',0x'
		numStart = numStart + numLen + 3;
		numLen = guidString.indexOf(',', numStart) - numStart;
		if (numLen <= 0) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidComma');
			return false;
		}
		const [success2, _B] = Guid.StringToShort(guidString.substring(numStart, numLen) /*first DWORD*/, -1, Guid.IsTight, result);
		result.parsedGuid._b = _B;
		if (!success2) return false;
		// Check for '0x'
		if (!Guid.IsHexPrefix(guidString, numStart + numLen + 1)) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidHexPrefix');
			return false;
		}
		// +3 to get by ',0x'
		numStart = numStart + numLen + 3;
		numLen = guidString.indexOf(',', numStart) - numStart;
		if (numLen <= 0) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidComma');
			return false;
		}

		const [success3, _C] = Guid.StringToShort(guidString.substring(numStart, numLen) /*first DWORD*/, -1, Guid.IsTight, result);
		result.parsedGuid._c = _C;
		if (!success3) return false;

		// Check for '{'
		if (guidString.length <= numStart + numLen + 1 || guidString[numStart + numLen + 1] != '{') {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidBrace');
			return false;
		}

		// Prepare for loop1
		numLen++;
		const bytes = [];
		for (let i = 0; i < 8; i++) {
			if (!Guid.IsHexPrefix(guidString, numStart + numLen + 1)) {
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidHexPrefix');
				return false;
			}

			// +3 to get by ',0x' or '{0x' for first case
			numStart = numStart + numLen + 3;

			// Calculate number length
			if (i < 7) {
				// first 7 cases
				numLen = guidString.indexOf(',', numStart) - numStart;
				if (numLen <= 0) {
					result.SetFailure1(ParseFailureKind.Format, 'Format_GuidComma');
					return false;
				}
			} // last case ends with '}', not ','
			else {
				numLen = guidString.indexOf('}', numStart) - numStart;
				if (numLen <= 0) {
					result.SetFailure1(ParseFailureKind.Format, 'Format_GuidBraceAfterLastNumber');
					return false;
				}
			}
			// Read in the number
			const number: uint = <uint>Convert.ToInt32(guidString.substring(numStart, numLen), 16);
			// check for overflow
			if (number > 255) {
				result.SetFailure1(ParseFailureKind.Format, 'Overflow_Byte');
				return false;
			}
			bytes[i] = <byte>number;
		}

		result.parsedGuid._d = bytes[0];
		result.parsedGuid._e = bytes[1];
		result.parsedGuid._f = bytes[2];
		result.parsedGuid._g = bytes[3];
		result.parsedGuid._h = bytes[4];
		result.parsedGuid._i = bytes[5];
		result.parsedGuid._j = bytes[6];
		result.parsedGuid._k = bytes[7];

		// Check for last '}'
		if (numStart + numLen + 1 >= guidString.length || guidString[numStart + numLen + 1] != '}') {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidEndBrace');
			return false;
		}

		// Check if we have extra characters at the end
		if (numStart + numLen + 1 != guidString.length - 1) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_ExtraJunkAtEnd');
			return false;
		}

		return true;
	}

	private static TryParseGuidWithNoStyle(guidString: String, result: GuidResult): bool {
		let startPos: int = 0;
		let temp: int;
		let templ: long;
		let currentPos: int = 0;

		if (guidString.length != 32) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvLen');
			return false;
		}

		for (let i = 0; i < guidString.length; i++) {
			let ch = guidString[i];
			if (ch >= '0' && ch <= '9') {
				continue;
			} else {
				let upperCaseCh = ch.toUpperCase();
				if (upperCaseCh >= 'A' && upperCaseCh <= 'F') {
					continue;
				}
			}

			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvalidChar');
			return false;
		}
		const [success, _A] = Guid.StringToInt(guidString.substring(startPos, 8) /*first DWORD*/, -1, Guid.IsTight, result);
		result.parsedGuid._a = _A;
		if (!success) return false;

		startPos += 8;
		const [success2, _B] = Guid.StringToShort(guidString.substring(startPos, 4) /*first DWORD*/, -1, Guid.IsTight, result);
		result.parsedGuid._b = _B;
		if (!success2) return false;

		startPos += 4;
		const [success3, _C] = Guid.StringToShort(guidString.substring(startPos, 4) /*first DWORD*/, -1, Guid.IsTight, result);
		result.parsedGuid._c = _C;
		if (!success3) return false;

		startPos += 4;
		const [success4, _TEMP] = Guid.StringToInt(guidString.substring(startPos, 4) /*first DWORD*/, -1, Guid.IsTight, result);
		temp = _TEMP;
		if (!success4) return false;

		startPos += 4;
		currentPos = startPos;

		const [success5, _TEMPL] = Guid.StringToLong(guidString.substring(startPos, 4) /*first DWORD*/, -1, Guid.IsTight, result);
		templ = _TEMPL;
		if (!success5) return false;

		if (currentPos - startPos != 12) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvLen');
			return false;
		}

		result.parsedGuid._d = <byte>(temp >> 8);
		result.parsedGuid._e = <byte>temp;
		temp = <int>(templ >> 32);
		result.parsedGuid._f = <byte>(temp >> 8);
		result.parsedGuid._g = <byte>temp;
		temp = <int>templ;
		result.parsedGuid._h = <byte>(temp >> 24);
		result.parsedGuid._i = <byte>(temp >> 16);
		result.parsedGuid._j = <byte>(temp >> 8);
		result.parsedGuid._k = <byte>temp;

		return true;
	}

	// Check if it's of the form [{|(]dddddddd-dddd-dddd-dddd-dddddddddddd[}|)]
	private static TryParseGuidWithDashes(guidString: String, result: GuidResult): bool {
		let startPos: int = 0;
		let temp: int;
		let templ: long;
		let currentPos: int = 0;

		if (guidString[0] == '{') {
			if (guidString.length != 38 || guidString[37] != '}') {
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvLen');
				return false;
			}
			startPos = 1;
		} else if (guidString[0] == '(') {
			if (guidString.length != 38 || guidString[37] != ')') {
				result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvLen');
				return false;
			}
			startPos = 1;
		} else if (guidString.length != 36) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvLen');
			return false;
		}

		if (
			guidString[8 + startPos] != '-' ||
			guidString[13 + startPos] != '-' ||
			guidString[18 + startPos] != '-' ||
			guidString[23 + startPos] != '-'
		) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidDashes');
			return false;
		}
		currentPos = startPos;

		const [success, _TEMP] = Guid.StringToInt2(guidString, currentPos, 8, Guid.NoSpace, result);
		temp = _TEMP;
		if (!success) return false;
		result.parsedGuid._a = temp;
		++currentPos; //Increment past the '-';

		const [success1, _TEMP1] = Guid.StringToInt2(guidString, currentPos, 4, Guid.NoSpace, result);
		temp = _TEMP1;
		if (!success1) return false;
		result.parsedGuid._b = <short>temp;
		++currentPos; //Increment past the '-';

		const [success2, _TEMP2] = Guid.StringToInt2(guidString, currentPos, 4, Guid.NoSpace, result);
		temp = _TEMP2;
		if (!success2) return false;
		result.parsedGuid._c = <short>temp;
		++currentPos; //Increment past the '-';

		const [success3, _TEMP3] = Guid.StringToInt2(guidString, currentPos, 4, Guid.NoSpace, result);
		temp = _TEMP1;
		if (!success3) return false;
		++currentPos; //Increment past the '-';
		startPos = currentPos;

		const [success4, _TEMPL] = Guid.StringToLong(guidString, currentPos, Guid.NoSpace, result);
		templ = _TEMPL;
		if (!success4) return false;

		if (currentPos - startPos != 12) {
			result.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvLen');
			return false;
		}
		result.parsedGuid._d = <byte>(temp >> 8);
		result.parsedGuid._e = <byte>temp;
		temp = <int>(templ >> 32);
		result.parsedGuid._f = <byte>(temp >> 8);
		result.parsedGuid._g = <byte>temp;
		temp = <int>templ;
		result.parsedGuid._h = <byte>(temp >> 24);
		result.parsedGuid._i = <byte>(temp >> 16);
		result.parsedGuid._j = <byte>(temp >> 8);
		result.parsedGuid._k = <byte>temp;

		return true;
	}

	private static EatAllWhitespace(str: String): String {
		let newLength = 0;
		const chArr: char[] = [];
		let curChar: char;

		// Now get each char from str and if it is not whitespace add it to chArr
		for (let i = 0; i < str.length; i++) {
			curChar = <number>(<unknown>str[i]);
			if (!(/* Char. */ Guid.IsWhiteSpace(curChar))) {
				chArr[newLength++] = curChar;
			}
		}

		// Return a new string based on chArr
		return new String(chArr);
	}

	private static IsHexPrefix(str: String, i: int): bool {
		if (str.length > i + 1 && str[i] == '0' && str[i + 1].toLowerCase() == 'x') return true;
		else return false;
	}

	private static IsWhiteSpace(ch: char) {
		return ch <= 32 && <string>(<unknown>ch) != '\0';
	}

	private static IsNullOrEmpty(value: String): bool {
		return value == null || value.length == 0;
	}

	private static StringToInt(str: String, requiredLength: int, flags: int, parseResult: GuidResult): [bool, int] {
		return this.StringToInt2(str, null, requiredLength, flags, parseResult);
	}

	private static StringToInt2(str: String, parsePos: int, requiredLength: int, flags: int, parseResult: GuidResult): [bool, int] {
		let result = 0;

		const currStart = parsePos == null ? 0 : parsePos;
		try {
			result = parseInt(<string>str, 16);
		} catch (ex) {
			if (parseResult.throwStyle == GuidParseThrowStyle.All) {
				throw null;
			} else if (parseResult.throwStyle == GuidParseThrowStyle.AllButOverflow) {
				throw new FormatException('Format_GuidUnrecognized', ex);
			} else {
				parseResult.SetFailure(ex);
				return [false, result];
			}
		}

		//If we didn't parse enough characters, there's clearly an error.
		if (requiredLength != -1 && parsePos != null && parsePos - currStart != requiredLength) {
			parseResult.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvalidChar');
			return [false, result];
		}
		return [true, result];
	}

	private static StringToLong(str: String, requiredLength: int, flags: int, parseResult: GuidResult): [bool, long] {
		return this.StringToLong2(str, null, requiredLength, flags, parseResult);
	}

	private static StringToLong2(str: String, parsePos: int, requiredLength: int, flags: int, parseResult: GuidResult): [bool, long] {
		let result = 0;

		const currStart = parsePos == null ? 0 : parsePos;
		try {
			result = parseInt(<string>str, 16);
		} catch (ex) {
			if (parseResult.throwStyle == GuidParseThrowStyle.All) {
				throw null;
			} else if (parseResult.throwStyle == GuidParseThrowStyle.AllButOverflow) {
				throw new FormatException('Format_GuidUnrecognized', ex);
			} else {
				parseResult.SetFailure(ex);
				return [false, result];
			}
		}

		//If we didn't parse enough characters, there's clearly an error.
		if (requiredLength != -1 && parsePos != null && parsePos - currStart != requiredLength) {
			parseResult.SetFailure1(ParseFailureKind.Format, 'Format_GuidInvalidChar');
			return [false, result];
		}
		return [true, result];
	}

	private static StringToShort(str: String, requiredLength: int, flags: int, parseResult: GuidResult): [bool, short] {
		return this.StringToShort2(str, null, requiredLength, flags, parseResult);
	}

	private static StringToShort2(str: String, parsePos: int, requiredLength: int, flags: int, parseResult: GuidResult): [bool, short] {
		let result = 0;
		const [retValue, x] = Guid.StringToInt2(str, parsePos, requiredLength, flags, parseResult);
		result = <short>x;
		return [retValue, result];
	}

	// Returns an unsigned byte array containing the GUID.
	public ToByteArray(): byte[] {
		let g: byte[] = [];

		g[0] = <byte>this._a;
		g[1] = <byte>(this._a >> 8);
		g[2] = <byte>(this._a >> 16);
		g[3] = <byte>(this._a >> 24);
		g[4] = <byte>this._b;
		g[5] = <byte>(this._b >> 8);
		g[6] = <byte>this._c;
		g[7] = <byte>(this._c >> 8);
		g[8] = this._d;
		g[9] = this._e;
		g[10] = this._f;
		g[11] = this._g;
		g[12] = this._h;
		g[13] = this._i;
		g[14] = this._j;
		g[15] = this._k;

		return g;
	}

	public ToString(): String {
		return this.ToString2('D', null);
	}

	public GetHashCode(): int {
		return this._a ^ (((<int>this._b) << 16) | (<int>(<ushort>this._c))) ^ (((<int>this._f) << 24) | this._k);
	}

	public Equals(o: Object): bool {
		let g: Guid;
		// Check that o is a Guid first
		if (o == null || !(o instanceof Object)) return false;
		else g = <Guid>o;

		// Now compare each of the elements
		if (g._a != this._a) return false;
		if (g._b != this._b) return false;
		if (g._c != this._c) return false;
		if (g._d != this._d) return false;
		if (g._e != this._e) return false;
		if (g._f != this._f) return false;
		if (g._g != this._g) return false;
		if (g._h != this._h) return false;
		if (g._i != this._i) return false;
		if (g._j != this._j) return false;
		if (g._k != this._k) return false;

		return true;
	}

	public Equals1(g: Guid): bool {
		// Now compare each of the elements
		if (g._a != this._a) return false;
		if (g._b != this._b) return false;
		if (g._c != this._c) return false;
		if (g._d != this._d) return false;
		if (g._e != this._e) return false;
		if (g._f != this._f) return false;
		if (g._g != this._g) return false;
		if (g._h != this._h) return false;
		if (g._i != this._i) return false;
		if (g._j != this._j) return false;
		if (g._k != this._k) return false;

		return true;
	}

	private GetResult(me: uint, them: uint): int {
		if (me < them) {
			return -1;
		}
		return 1;
	}

	public CompareTo(value: Object): int {
		if (value == null) {
			return 1;
		}
		if (!(value instanceof Guid)) {
			throw new ArgumentException('Arg_MustBeGuid');
		}
		let g = <Guid>value;

		if (g._a != this._a) {
			return this.GetResult(<uint>this._a, <uint>g._a);
		}

		if (g._b != this._b) {
			return this.GetResult(<uint>this._b, <uint>g._b);
		}

		if (g._c != this._c) {
			return this.GetResult(<uint>this._c, <uint>g._c);
		}

		if (g._d != this._d) {
			return this.GetResult(<uint>this._d, <uint>g._d);
		}

		if (g._e != this._e) {
			return this.GetResult(<uint>this._e, <uint>g._e);
		}

		if (g._f != this._f) {
			return this.GetResult(<uint>this._f, <uint>g._f);
		}

		if (g._g != this._g) {
			return this.GetResult(<uint>this._g, <uint>g._g);
		}

		if (g._h != this._h) {
			return this.GetResult(<uint>this._h, <uint>g._h);
		}

		if (g._i != this._i) {
			return this.GetResult(<uint>this._i, <uint>g._i);
		}

		if (g._j != this._j) {
			return this.GetResult(<uint>this._j, <uint>g._j);
		}

		if (g._k != this._k) {
			return this.GetResult(<uint>this._k, <uint>g._k);
		}

		return 0;
	}

	// This will create a new guid.  Since we've now decided that constructors should 0-init,
	// we need a method that allows users to create a guid.

	public static NewGuid(): Guid {
		// CoCreateGuid should never return Guid.Empty, since it attempts to maintain some
		// uniqueness guarantees.  It should also never return a known GUID, but it's unclear
		// how extensively it checks for known values.

		let guid = new Guid();
		return guid;
	}

	private static HexToChar(a: int): char {
		a = a & 0xf;
		return <char>(a > 9 ? a - 10 + 0x61 : a + 0x30);
	}

	private static HexsToChars(guidChars: any[], offset: int, a: int, b: int): int {
		return Guid.HexsToChars1(guidChars, offset, a, b, false);
	}

	private static HexsToChars1(guidChars: any[], offset: int, a: int, b: int, hex: bool): int {
		if (hex) {
			guidChars[offset++] = '0';
			guidChars[offset++] = 'x';
		}
		guidChars[offset++] = Guid.HexToChar(a >> 4);
		guidChars[offset++] = Guid.HexToChar(a);
		if (hex) {
			guidChars[offset++] = ',';
			guidChars[offset++] = '0';
			guidChars[offset++] = 'x';
		}
		guidChars[offset++] = Guid.HexToChar(b >> 4);
		guidChars[offset++] = Guid.HexToChar(b);
		return offset;
	}

	// IFormattable interface
	// We currently ignore provider
	public ToString2(format: String, provider: IFormatProvider): String {
		if (format == null || format.length == 0) format = 'D';

		let guidString: string;
		let offset: int = 0;
		let dash = true;
		let hex = false;

		if (format.length != 1) {
			// all acceptable format strings are of length 1
			throw new FormatException('Format_InvalidGuidFormatSpecification');
		}

		let formatCh = format[0];
		if (formatCh == 'D' || formatCh == 'd') {
			guidString = '';
		} else if (formatCh == 'N' || formatCh == 'n') {
			guidString = '';
			dash = false;
		} else if (formatCh == 'B' || formatCh == 'b') {
			guidString = '';
			let guidChars = [];
			guidChars[offset++] = '{';
			guidChars[37] = '}';
		} else if (formatCh == 'P' || formatCh == 'p') {
			guidString = '';
			let guidChars = [];

			guidChars[offset++] = '(';
			guidChars[37] = ')';
		} else if (formatCh == 'X' || formatCh == 'x') {
			guidString = '';
			let guidChars = [];

			guidChars[offset++] = '{';
			guidChars[67] = '}';
			dash = false;
			hex = true;
		} else {
			throw new FormatException('Format_InvalidGuidFormatSpecification');
		}
		let guidChars = [];

		if (hex) {
			// {0xdddddddd,0xdddd,0xdddd,{0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd}}
			guidChars[offset++] = '0';
			guidChars[offset++] = 'x';
			offset = Guid.HexsToChars(guidChars, offset, this._a >> 24, this._a >> 16);
			offset = Guid.HexsToChars(guidChars, offset, this._a >> 8, this._a);
			guidChars[offset++] = ',';
			guidChars[offset++] = '0';
			guidChars[offset++] = 'x';
			offset = Guid.HexsToChars(guidChars, offset, this._b >> 8, this._b);
			guidChars[offset++] = ',';
			guidChars[offset++] = '0';
			guidChars[offset++] = 'x';
			offset = Guid.HexsToChars(guidChars, offset, this._c >> 8, this._c);
			guidChars[offset++] = ',';
			guidChars[offset++] = '{';
			offset = Guid.HexsToChars1(guidChars, offset, this._d, this._e, true);
			guidChars[offset++] = ',';
			offset = Guid.HexsToChars1(guidChars, offset, this._f, this._g, true);
			guidChars[offset++] = ',';
			offset = Guid.HexsToChars1(guidChars, offset, this._h, this._i, true);
			guidChars[offset++] = ',';
			offset = Guid.HexsToChars1(guidChars, offset, this._j, this._k, true);
			guidChars[offset++] = '}';
		} else {
			// [{|(]dddddddd[-]dddd[-]dddd[-]dddd[-]dddddddddddd[}|)]
			offset = Guid.HexsToChars(guidChars, offset, this._a >> 24, this._a >> 16);
			offset = Guid.HexsToChars(guidChars, offset, this._a >> 8, this._a);
			if (dash) guidChars[offset++] = '-';
			offset = Guid.HexsToChars(guidChars, offset, this._b >> 8, this._b);
			if (dash) guidChars[offset++] = '-';
			offset = Guid.HexsToChars(guidChars, offset, this._c >> 8, this._c);
			if (dash) guidChars[offset++] = '-';
			offset = Guid.HexsToChars(guidChars, offset, this._d, this._e);
			if (dash) guidChars[offset++] = '-';
			offset = Guid.HexsToChars(guidChars, offset, this._f, this._g);
			offset = Guid.HexsToChars(guidChars, offset, this._h, this._i);
			offset = Guid.HexsToChars(guidChars, offset, this._j, this._k);
		}
		guidString = guidChars.join('');
		return guidString;
	}

	public static readonly PrintAsI1 = 0x40;
	public static readonly PrintAsI2 = 0x80;
	public static readonly PrintAsI4 = 0x100;
	public static readonly TreatAsUnsigned = 0x200;
	public static readonly TreatAsI1 = 0x400;
	public static readonly TreatAsI2 = 0x800;
	public static readonly IsTight = 0x1000;
	public static readonly NoSpace = 0x2000;
}

enum GuidStyles {
	None = 0x00000000,
	AllowParenthesis = 0x00000001, //Allow the guid to be enclosed in parens
	AllowBraces = 0x00000002, //Allow the guid to be enclosed in braces
	AllowDashes = 0x00000004, //Allow the guid to contain dash group separators
	AllowHexPrefix = 0x00000008, //Allow the guid to contain {0xdd,0xdd}
	RequireParenthesis = 0x00000010, //Require the guid to be enclosed in parens
	RequireBraces = 0x00000020, //Require the guid to be enclosed in braces
	RequireDashes = 0x00000040, //Require the guid to contain dash group separators
	RequireHexPrefix = 0x00000080, //Require the guid to contain {0xdd,0xdd}

	HexFormat = RequireBraces | RequireHexPrefix /* X */,
	NumberFormat = None /* N */,
	DigitFormat = RequireDashes /* D */,
	BraceFormat = RequireBraces | RequireDashes /* B */,
	ParenthesisFormat = RequireParenthesis | RequireDashes /* P */,

	Any = AllowParenthesis | AllowBraces | AllowDashes | AllowHexPrefix,
}
enum GuidParseThrowStyle {
	None = 0,
	All = 1,
	AllButOverflow = 2,
}
enum ParseFailureKind {
	None = 0,
	ArgumentNull = 1,
	Format = 2,
	FormatWithParameter = 3,
	NativeException = 4,
	FormatWithInnerException = 5,
}

class GuidResult {
	public parsedGuid: Guid;
	public throwStyle: GuidParseThrowStyle;

	public m_failure: ParseFailureKind;
	public m_failureMessageID: string;
	public m_failureMessageFormatArgument: object;
	public m_failureArgumentName: string;
	public m_innerException: Exception;

	public Init(canThrow: GuidParseThrowStyle): void {
		this.parsedGuid = Guid.Empty;
		this.throwStyle = canThrow;
	}
	public SetFailure(nativeException: Exception) {
		this.m_failure = ParseFailureKind.NativeException;
		this.m_innerException = nativeException;
	}
	public SetFailure1(failure: ParseFailureKind, failureMessageID: string) {
		this.SetFailure3(failure, failureMessageID, null, null, null);
	}
	public SetFailure2(failure: ParseFailureKind, failureMessageID: string, failureMessageFormatArgument: object) {
		this.SetFailure3(failure, failureMessageID, failureMessageFormatArgument, null, null);
	}
	public SetFailure3(
		failure: ParseFailureKind,
		failureMessageID: string,
		failureMessageFormatArgument: object,
		failureArgumentName: string,
		innerException: Exception,
	) {
		this.m_failure = failure;
		this.m_failureMessageID = failureMessageID;
		this.m_failureMessageFormatArgument = failureMessageFormatArgument;
		this.m_failureArgumentName = failureArgumentName;
		this.m_innerException = innerException;
		if (this.throwStyle != GuidParseThrowStyle.None) {
			throw this.GetGuidParseException();
		}
	}

	public GetGuidParseException(): Exception {
		switch (this.m_failure) {
			case ParseFailureKind.ArgumentNull:
				return new ArgumentNullException(this.m_failureArgumentName);

			case ParseFailureKind.FormatWithInnerException:
				return new FormatException(this.m_failureMessageID, this.m_innerException);

			case ParseFailureKind.FormatWithParameter:
				return new FormatException(this.m_failureMessageID);

			case ParseFailureKind.Format:
				return new FormatException(this.m_failureMessageID);

			case ParseFailureKind.NativeException:
				return this.m_innerException;

			default:
				return new FormatException('Format_GuidUnrecognized');
		}
	}
}
