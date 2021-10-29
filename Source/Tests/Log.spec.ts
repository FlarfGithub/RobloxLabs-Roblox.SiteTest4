import { FastVarType } from '../Assemblies/Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';
import {
	DFFlag,
	DYNAMIC_FASTFLAGVARIABLE,
	FASTLOG,
	FASTLOG1,
	FASTLOG1F,
	FASTLOG3,
	FASTLOG3F,
	FASTLOGS,
	FFlag,
	FLog,
	LOGGROUP,
	LOGVARIABLE,
	RegisterFlag,
	RegisterLogGroup,
	SetValue,
} from '../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

LOGGROUP('UnitTestOn');
LOGGROUP('UnitTestOff');

LOGVARIABLE('UnitTestOn', 1);
LOGVARIABLE('UnitTestOff', 0);

DYNAMIC_FASTFLAGVARIABLE('DebugUnitDynamicFlag', true);

const persist = { i: 23 };
function increment() {
	return ++persist.i;
}

describe('Conditionals', () => {
	it('Should pass conditionals', () => {
		let i = 2;
		if (false) FASTLOG1(FLog['UnitTestOff'], '[FLog::UnitTestOff] Just Message %d', increment());
		else if (true) i = 4;

		expect(i).toEqual(4);

		// If this test fails, then the macro was not written properly because
		// it exposes a partial if-then block. (One more reason MACROS are worse than templates :)
		//
		// Here is the incorrect implementation:
		// #define FASTLOG1(group,level,message,arg1) if(...) RBX::FastLog(...)
		//
		// Here is a correct implementation:
		// #define FASTLOG1(group,level,message,arg1) do { if(...) RBX::FastLog(...); } while (0)
		//
		// The do {} while (0) clause is one way to wrap the macro into a self-contained statement
		// IMPORTANT Notice that there is NO ";" at the end of the block.
		// See http://stackoverflow.com/questions/1067226/c-multi-line-macro-do-while0-vs-scope-block
	});
});

describe('LazyEval', () => {
	it('Should evaluate lazily', () => {
		persist.i = 3;
		FASTLOG1(FLog['UnitTestOff'], '[FLog::UnitTestOff] Just Message %d', increment());
		expect(persist.i).toEqual(4);

		persist.i = 13;
		FASTLOG1(FLog['Warning'], '[FLog::Warning] Warning %d', increment());
		expect(persist.i).toEqual(14);

		persist.i = 23;
		FASTLOG1(FLog['Error'], '[FLog::Error] Just Message %d', increment());
		expect(persist.i).toEqual(24);
	});
});

describe('BasicLog', () => {
	it('Should basically log to server.log', () => {
		let start = Date.now();

		let nullString = '',
			shortString = 'aaaaa',
			longString = 'very very long string';
		for (let i = 0; i < 2048; i++) {
			FASTLOG(FLog['UnitTestOn'], '[FLog::UnitTestOn] Just Message');
			FASTLOG1(FLog['UnitTestOn'], '[FLog::UnitTestOn] Message with argument %u', 1);
			FASTLOG3(FLog['UnitTestOn'], '[FLog::UnitTestOn] Message with pointer %s, number %u and %u', this, 3, 2);
			FASTLOGS(FLog['UnitTestOn'], '[FLog::UnitTestOn] String message - %s', '');
			FASTLOGS(FLog['UnitTestOn'], '[FLog::UnitTestOn] String message - %s', 'AAAAA');
			FASTLOGS(FLog['UnitTestOn'], '[FLog::UnitTestOn] Large string message - %s', '01234567890123456789');

			FASTLOG1F(FLog['UnitTestOn'], '[FLog::UnitTestOn] Message with argument %f', 10.0);
			FASTLOG3F(FLog['UnitTestOn'], '[FLog::UnitTestOn] Message with argument %f %f %f', 10.0, 5.0, -1.0);

			FASTLOG(FLog['UnitTestOn'], '[FLog::UnitTestOn] Log');
			FASTLOG(FLog['UnitTestOn'], '[FLog::UnitTestOn] One more');

			FASTLOG(FLog['UnitTestOff'], '[FLog::UnitTestOff] Off');
			FASTLOG(FLog['UnitTestOff'], '[FLog::UnitTestOff] Off, but on');

			FASTLOGS(FLog['UnitTestOn'], '[FLog::UnitTestOn] Null string message - %s', nullString);
			FASTLOGS(FLog['UnitTestOn'], '[FLog::UnitTestOn] Short string message - %s', shortString);
			FASTLOGS(FLog['UnitTestOn'], '[FLog::UnitTestOn] Long string message - %s', longString);
		}

		let finish = Date.now();
		FASTLOG1F(FLog['UnitTestOn'], '[FLog::UnitTestOn] Logging took %f seconds', (finish - start) / 1000);
	});
});

describe('FastFlags', () => {
	it('Should set the values and continue', () => {
		SetValue('TestFastFlag', 'True', FastVarType.FFlag);
		expect(FFlag['TestFastFlag']).toEqual(true);
		SetValue('TestFastFlag', 'False', FastVarType.FFlag);
		expect(FFlag['TestFastFlag']).toEqual(false);
	});
});

describe('SettingUnknownGroups', () => {
	it('Should set the enviornment flag values, regardless if they are defined in Roblox.Configuration', () => {
		SetValue('UnknownGroup', '1', FastVarType.FLog);
		SetValue('UnknownFlag', 'true', FastVarType.FFlag);
		{
			let UnknownGroup = 0;
			UnknownGroup = RegisterLogGroup('UnknownGroup');

			let UnknownFlag: bool = <bool>(<unknown>0);
			UnknownFlag = RegisterFlag('UnknownFlag');

			expect(UnknownGroup).toEqual(1);
			expect(UnknownFlag).toEqual(true);
		}
	});
});

describe('DynamicVariables', () => {
	it('Should set a dynamic var', () => {
		SetValue('DebugUnitDynamicFlag', 'false', FastVarType.DFFlag);
		expect(DFFlag('DebugUnitDynamicFlag')).toEqual(!false);
	});
});
