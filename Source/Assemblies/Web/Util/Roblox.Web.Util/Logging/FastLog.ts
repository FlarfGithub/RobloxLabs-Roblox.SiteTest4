// Channel 1: Non-chatty / important events (Game started, loaded UI script) -- more permanent messages
// Channel 2: Per frame data
// Channel 3-7: User defined / used for debugging / more temporary

// Refactor, Refator, Refactor!!

import {
	ClientSettings,
	FastVarType,
} from '../../../../Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';
import fs from 'fs';
import { __baseDirName } from '../../../../Common/Constants/Roblox.Common.Constants/Directories';
import dotenv from 'dotenv';
import { Convert } from '../../../../../System/Convert';

dotenv.config({ path: __baseDirName + '/.env' });

export const FastLogCacheStore = {
	DFLog: new Map<string, number>(),
	DFFlag: new Map<string, boolean>(),
	DFInt: new Map<string, number>(),
	DFString: new Map<string, string>(),
} as const;

//////////////////////////////////////////////////////////////////
// FastLog
//////////////////////////////////////////////////////////////////

/**
 * Contains static FastLog variables.
 */
export let FLog: Record<string, number> = {};

/**
 * A function that refetches the value of the named FastLog variable in {name} and returns it.
 * @param {string} name The name of the FastLog variable.
 * @returns {number} Returns a number that can be used in the FastLogLibrary.
 */
export const DFLog = function (name: string): number {
	const dynamicFastLogLevelsFromConfiguration = ClientSettings.GetDFLogs();
	if (dynamicFastLogLevelsFromConfiguration) {
		new Map<string, number>(Object.entries(dynamicFastLogLevelsFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFLog[key] = value;
		});
	}
	return dynamicFastLogLevelsFromConfiguration[name] || FastLogCacheStore.DFLog[name] || 0;
};

/**
 * Contains server sided FastLog variables.
 */
export let SFLog: Record<string, number> = {};

//////////////////////////////////////////////////////////////////
// FastFlag
//////////////////////////////////////////////////////////////////

/**
 * Contains static FastFlag variables.
 */
export let FFlag: Record<string, boolean> = {};

/**
 * A function that refetches the value of the named FastFlag variable in {name} and returns it.
 * @param {string} name The name of the FastFlag variable.
 * @returns {boolean} Returns a boolean that can be used in the code base to enable certain features.
 */
export const DFFlag = function (name: string): boolean {
	const dynamicFastFlagVariablesFromConfiguration = ClientSettings.GetDFFlags();
	if (dynamicFastFlagVariablesFromConfiguration) {
		new Map<string, boolean>(Object.entries(dynamicFastFlagVariablesFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFFlag[key] = value;
		});
	}
	return dynamicFastFlagVariablesFromConfiguration[name] || FastLogCacheStore.DFFlag[name] || false;
};

/**
 * Contains server sided FastFlag variables.
 */
export let SFFlag: Record<string, boolean> = {};

//////////////////////////////////////////////////////////////////
// FastInt or FastNumber
//////////////////////////////////////////////////////////////////

/**
 * Contains static FastInt/FastNumber variables.
 */
export let FInt: Record<string, number> = {};

/**
 * A function that refetches the value of the named FastInt/FastNumber variable in {name} and returns it.
 * @param {string} name The name of the FastInt/FastNumber variable.
 * @returns {number} Returns a number that can be used in the code base to change certain features.
 */
export const DFInt = function (name: string): number {
	const dynamicFastIntegerVariablesFromConfiguration = ClientSettings.GetDFInts();
	if (dynamicFastIntegerVariablesFromConfiguration) {
		new Map<string, number>(Object.entries(dynamicFastIntegerVariablesFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFInt[key] = value;
		});
	}
	return dynamicFastIntegerVariablesFromConfiguration[name] || FastLogCacheStore.DFInt[name] || 0;
};

/**
 * Contains server sided FastInt/FastNumber variables.
 */
export let SFInt: Record<string, number> = {};

//////////////////////////////////////////////////////////////////
// FastString
//////////////////////////////////////////////////////////////////

/**
 * Contains static FastString variables.
 */
export let FString: Record<string, string> = {};

/**
 * A function that refetches the value of the named FastString variable in {name} and returns it.
 * @param {string} name The name of the FastString variable.
 * @returns {boolean} Returns a string that can be used in the code base to change certain features.
 */
export const DFString = function (name: string): string {
	const dynamicFastStringVariablesFromConfiguration = ClientSettings.GetDFStrings();
	if (dynamicFastStringVariablesFromConfiguration) {
		new Map<string, string>(Object.entries(dynamicFastStringVariablesFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFString[key] = value;
		});
	}
	return dynamicFastStringVariablesFromConfiguration[name] || FastLogCacheStore.DFString[name] || '';
};

/**
 * Contains server sided FastString variables.
 */
export let SFString: Record<string, string> = {};

//////////////////////////////////////////////////////////////////
// Misc
//////////////////////////////////////////////////////////////////

/**
 * An array of strings that contain ClientPackNames.
 */
export const FSettings: Array<string> = [];

/**
 * Used to enable certain features.
 * @internal This is internal.
 */
export const FastLogSetup = {
	WasSetup: false,
};

/**
 * Mimics the C++ function sprintf_s.
 * @param {...string[]} args The arguments to include, normally the 1st is the string to modify.
 * @returns {string} Returns a formatted string.
 * @internal This is internal.
 */
const parameterizedString = (...args: string[]): string => {
	const string = args[0];
	let i = 1;
	return string.replace(/%((%)|s|d|f|lf|i|x|X|u)/g, function (m: any) {
		// m is the matched format, e.g. %s, %d
		let val = null;
		if (m[2]) {
			val = m[2];
		} else {
			val = args[i];
			if (val !== null) {
				// A switch statement so that the formatter can be extended. Default is %s
				switch (m) {
					case '%d' || '%f' || '%lf':
						val = parseFloat(val);
						if (isNaN(val)) {
							val = 0;
						}
						break;
					case '%i' || '%u':
						val = parseInt(val);
						if (isNaN(val)) {
							val = 0;
						}
						break;
					case '%x':
						val = val.toString(16).toLowerCase();
						break;
					case '%X':
						val = val.toString(16).toUpperCase();
						break;
				}
			}
			i++;
		}
		return val;
	});
};

/**
 * Sets up FLog initially.
 * @internal This is internal.
 */
export function ResetFastLog() {
	const fastLogLevelsFromConfiguration = ClientSettings.GetFLogs();
	const dynamicFastLogLevelsFromConfiguration = ClientSettings.GetDFLogs();
	const serverFastLogLevelsFromConfiguration = ClientSettings.GetSFLogs();
	const fastFlagVariablesFromConfiguration = ClientSettings.GetFFlags();
	const dynamicFastFlagVariablesFromConfiguration = ClientSettings.GetDFFlags();
	const serverFastFlagVariablesFromConfiguration = ClientSettings.GetSFFlags();
	const fastIntegerVariablesFromConfiguration = ClientSettings.GetFInts();
	const dynamicFastIntegerVariablesFromConfiguration = ClientSettings.GetDFInts();
	const serverFastIntegerVariablesFromConfiguration = ClientSettings.GetSFInts();
	const fastStringVariablesFromConfiguration = ClientSettings.GetFStrings();
	const dynamicFastStringVariablesFromConfiguration = ClientSettings.GetDFStrings();
	const serverFastStringVariablesFromConfiguration = ClientSettings.GetSFStrings();
	const fastSettingsGroupsFromConfiguration = ClientSettings.GetFSettings();

	if (fastLogLevelsFromConfiguration) {
		new Map<string, number>(Object.entries(fastLogLevelsFromConfiguration)).forEach((value, key) => {
			FLog[key] = value;
		});
	}
	if (dynamicFastLogLevelsFromConfiguration) {
		new Map<string, number>(Object.entries(dynamicFastLogLevelsFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFLog[key] = value;
		});
	}
	if (serverFastLogLevelsFromConfiguration) {
		new Map<string, number>(Object.entries(serverFastLogLevelsFromConfiguration)).forEach((value, key) => {
			SFLog[key] = value;
		});
	}

	if (fastFlagVariablesFromConfiguration) {
		new Map<string, boolean>(Object.entries(fastFlagVariablesFromConfiguration)).forEach((value, key) => {
			FFlag[key] = value;
		});
	}
	if (dynamicFastFlagVariablesFromConfiguration) {
		new Map<string, boolean>(Object.entries(dynamicFastFlagVariablesFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFFlag[key] = value;
		});
	}
	if (serverFastFlagVariablesFromConfiguration) {
		new Map<string, boolean>(Object.entries(serverFastFlagVariablesFromConfiguration)).forEach((value, key) => {
			SFFlag[key] = value;
		});
	}

	if (fastIntegerVariablesFromConfiguration) {
		new Map<string, number>(Object.entries(fastIntegerVariablesFromConfiguration)).forEach((value, key) => {
			FInt[key] = value;
		});
	}
	if (dynamicFastIntegerVariablesFromConfiguration) {
		new Map<string, number>(Object.entries(dynamicFastIntegerVariablesFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFInt[key] = value;
		});
	}
	if (serverFastIntegerVariablesFromConfiguration) {
		new Map<string, number>(Object.entries(serverFastIntegerVariablesFromConfiguration)).forEach((value, key) => {
			SFInt[key] = value;
		});
	}

	if (fastStringVariablesFromConfiguration) {
		new Map<string, string>(Object.entries(fastStringVariablesFromConfiguration)).forEach((value, key) => {
			FString[key] = value;
		});
	}
	if (dynamicFastStringVariablesFromConfiguration) {
		new Map<string, string>(Object.entries(dynamicFastStringVariablesFromConfiguration)).forEach((value, key) => {
			FastLogCacheStore.DFString[key] = value;
		});
	}
	if (serverFastStringVariablesFromConfiguration) {
		new Map<string, string>(Object.entries(serverFastStringVariablesFromConfiguration)).forEach((value, key) => {
			SFString[key] = value;
		});
	}

	if (fastSettingsGroupsFromConfiguration) {
		(<string[]>fastSettingsGroupsFromConfiguration).forEach((element) => {
			FSettings.push(element);
		});
	}
	FastLogSetup.WasSetup = true;
}

/**
 * Prints a message to the outputstream and filestream.
 * @param {number} level The FastLog level.
 * @param {number} threadId The Id of the current running thread.
 * @param {string} timeStamp An ISO8806 date string.
 * @param {string} message The message to formatted and logged.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @param {any} arg2 Arg2
 * @param {any} arg3 Arg3
 * @param {any} arg4 Arg4
 * @returns {void} Returns nothing.
 * @internal This is internal.
 */
function printMessage(
	level: number,
	threadId: number,
	timeStamp: string,
	message: string,
	arg0: any,
	arg1: any,
	arg2: any,
	arg3: any,
	arg4: any,
): void {
	const formatted = parameterizedString(message, arg0, arg1, arg2, arg3, arg4);
	const out = `${timeStamp},${process.uptime().toPrecision(6)},${threadId.toString(16)},${Math.floor(level) || 1} ${formatted}`;
	console.log(out);
	// We only FLog to file on FastLogss greater than 7
	if (level >= 7)
		fs.appendFileSync(__baseDirName + `/server.log`, `${out}\n`, {
			encoding: 'utf-8',
		});
}
/**
 * A function that checks the LogLevel to be greater than 5.
 * @param {number} level The FastLog level.
 * @param {string} message The message to formatted and logged.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @param {any} arg2 Arg2
 * @param {any} arg3 Arg3
 * @param {any} arg4 Arg4
 * @returns {void} Returns nothing.
 * @internal This is internal.
 */
function FastLog(level: number, message: string, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any): void {
	if (level > 5) {
		printMessage(level, process.pid, new Date(Date.now()).toISOString(), message, arg0, arg1, arg2, arg3, arg4);
	}
}

/**
 * FastLogs a message with no params.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @returns {void} Returns nothing.
 */
export const FASTLOG = (group: number, message: string): void => {
	do {
		if (group) FastLog(group, message, null, null, null, null, null);
	} while (0);
};

/**
 * FastLogs a message with 1 param of any type.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {any} arg0 Arg0
 * @returns {void} Returns nothing.
 */
export const FASTLOG1 = (group: number, message: string, arg0: any): void => {
	do {
		if (group) FastLog(group, message, arg0, null, null, null, null);
	} while (0);
};

/**
 * FastLogs a message with 2 params of any type.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @returns {void} Returns nothing.
 */
export const FASTLOG2 = (group: number, message: string, arg0: any, arg1: any): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, null, null, null);
	} while (0);
};

/**
 * FastLogs a message with 3 params of any type.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @param {any} arg2 Arg2
 * @returns {void} Returns nothing.
 */
export const FASTLOG3 = (group: number, message: string, arg0: any, arg1: any, arg2: any): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, arg2, null, null);
	} while (0);
};

/**
 * FastLogs a message with 4 params of any type.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @param {any} arg2 Arg2
 * @param {any} arg3 Arg3
 * @returns {void} Returns nothing.
 */
export const FASTLOG4 = (group: number, message: string, arg0: any, arg1: any, arg2: any, arg3: any): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, arg2, arg3, null);
	} while (0);
};

/**
 * FastLogs a message with 5 params of any type.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @param {any} arg2 Arg2
 * @param {any} arg3 Arg3
 * @param {any} arg4 Arg4
 * @returns {void} Returns nothing.
 */
export const FASTLOG5 = (group: number, message: string, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, arg2, arg3, arg4);
	} while (0);
};

/**
 * FastLogs a message with 1 string param.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {string} sarg The string argument to use.
 * @returns {void} Returns nothing.
 */
export const FASTLOGS = (group: number, message: string, sarg: string): void => {
	do {
		if (group) FastLog(group, message, sarg, null, null, null, null);
	} while (0);
};

/**
 * FastLogs a message with 1 param of number.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {number} arg0 Arg0
 * @returns {void} Returns nothing.
 */
export const FASTLOG1F = (group: number, message: string, arg0: number) => {
	do {
		if (group) FastLog(group, message, arg0, null, null, null, null);
	} while (0);
};

/**
 * FastLogs a message with 2 params of number.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {number} arg0 Arg0
 * @param {number} arg1 Arg1
 * @returns {void} Returns nothing.
 */
export const FASTLOG2F = (group: number, message: string, arg0: number, arg1: number): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, null, null, null);
	} while (0);
};

/**
 * FastLogs a message with 3 params of number.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {number} arg0 Arg0
 * @param {number} arg1 Arg1
 * @param {number} arg2 Arg2
 * @returns {void} Returns nothing.
 */
export const FASTLOG3F = (group: number, message: string, arg0: number, arg1: number, arg2: number): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, arg2, null, null);
	} while (0);
};

/**
 * FastLogs a message with 4 params of number.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {number} arg0 Arg0
 * @param {number} arg1 Arg1
 * @param {number} arg2 Arg2
 * @param {number} arg3 Arg3
 * @returns {void} Returns nothing.
 */
export const FASTLOG4F = (group: number, message: string, arg0: number, arg1: number, arg2: number, arg3: number): void => {
	do {
		if (group) FastLog(group, message, arg0, arg1, arg2, arg3, null);
	} while (0);
};

/**
 * FastLogs a message with no filter.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @returns {void} Returns nothing.
 */
export const FASTLOGNOFILTER = (group: number, message: string): void => {
	FastLog(group, message, null, null, null, null, null);
};

/**
 * FastLogs a message with no filter with 2 params of any type.
 * @param {number} group The FastLog level.
 * @param {string} message The message to log.
 * @param {any} arg0 Arg0
 * @param {any} arg1 Arg1
 * @returns {void} Returns nothing.
 */
export const FASTLOGNOFILTER2 = (group: number, message: string, arg0: any, arg1: any) => {
	FastLog(group, message, arg0, arg1, null, null, null);
};

/**
 * References the given groupName.
 * @param {string} group The name of the group to reference.
 */
export const LOGGROUP = (group: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FLog[group] === undefined) FLog[group] = 0;
};

/**
 * Sets the deault valur or gets the current value.
 * @param {string} group The name of the group to create.
 * @param {number} defaulton The value to set the group by,
 */
export const LOGVARIABLE = (group: string, defaulton: number) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FLog[group] = FLog[group] || defaulton;
};

/**
 * References the given groupName.
 * @param {string} group The name of the group to reference.
 */
export const DYNAMIC_LOGGROUP = (group: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FastLogCacheStore.DFLog[group] === undefined) FastLogCacheStore.DFLog[group] = 0;
};

/**
 * Sets the deault valur or gets the current value.
 * @param {string} group The name of the group to create.
 * @param {number} defaulton The value to set the group by,
 */
export const DYNAMIC_LOGVARIABLE = (group: string, defaulton: number) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FastLogCacheStore.DFLog[group] = FastLogCacheStore.DFLog[group] || defaulton;
};

/**
 * References the given groupName.
 * @param {string} group The name of the group to reference.
 */
export const SYNCHRONIZED_LOGGROUP = (group: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (SFLog[group] === undefined) SFLog[group] = 0;
};

/**
 * Sets the deault valur or gets the current value.
 * @param {string} group The name of the group to create.
 * @param {number} defaulton The value to set the group by,
 */
export const SYNCHRONIZED_LOGVARIABLE = (group: string, defaulton: number) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	SFLog[group] = SFLog[group] || defaulton;
};

export const FASTFLAG = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FFlag[v] === undefined) FFlag[v] = false;
};
export const FASTFLAGVARIABLE = (v: string, defaulton: boolean) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FFlag[v] = FFlag[v] || defaulton;
};

export const DYNAMIC_FASTFLAG = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FastLogCacheStore.DFFlag[v] === undefined) FastLogCacheStore.DFFlag[v] = false;
};
export const DYNAMIC_FASTFLAGVARIABLE = (v: string, defaulton: boolean) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FastLogCacheStore.DFFlag[v] = FastLogCacheStore.DFFlag[v] || defaulton;
};

export const SYNCHRONIZED_FASTFLAG = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (SFFlag[v] === undefined) SFFlag[v] = false;
};
export const SYNCHRONIZED_FASTFLAGVARIABLE = (v: string, defaulton: boolean) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	SFFlag[v] = SFFlag[v] || defaulton;
};

export const FASTINT = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FInt[v] === undefined) FInt[v] = 0;
};
export const FASTINTVARIABLE = (v: string, defaulton: number) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FInt[v] = FInt[v] || defaulton;
};

export const DYNAMIC_FASTINT = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FastLogCacheStore.DFInt[v] === undefined) FastLogCacheStore.DFInt[v] = 0;
};
export const DYNAMIC_FASTINTVARIABLE = (v: string, defaulton: number) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FastLogCacheStore.DFInt[v] = FastLogCacheStore.DFInt[v] || defaulton;
};

export const SYNCHRONIZED_FASTINT = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (SFInt[v] === undefined) SFInt[v] = 0;
};
export const SYNCHRONIZED_FASTINTVARIABLE = (v: string, defaulton: number) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	SFInt[v] = SFInt[v] || defaulton;
};

export const FASTSTRING = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FString[v] === undefined) FString[v] = '';
};
export const FASTSTRINGVARIABLE = (v: string, defaulton: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FString[v] = FString[v] || defaulton;
};

export const DYNAMIC_FASTSTRING = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (FastLogCacheStore.DFString[v] === undefined) FastLogCacheStore.DFString[v] = '';
};
export const DYNAMIC_FASTSTRINGVARIABLE = (v: string, defaulton: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	FastLogCacheStore.DFString[v] = FastLogCacheStore.DFString[v] || defaulton;
};

export const SYNCHRONIZED_FASTSTRING = (v: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	if (SFString[v] === undefined) SFString[v] = '';
};
export const SYNCHRONIZED_FASTSTRINGVARIABLE = (v: string, defaulton: string) => {
	if (!FastLogSetup.WasSetup) {
		ResetFastLog();
	}
	SFString[v] = SFString[v] || defaulton;
};

export const ClearFastLog = () => {
	FLog = {};
	SFLog = {};
	FastLogCacheStore.DFLog.clear();
	FFlag = {};
	SFFlag = {};
	FastLogCacheStore.DFFlag.clear();
	FInt = {};
	SFInt = {};
	FastLogCacheStore.DFInt.clear();
	FString = {};
	SFString = {};
	FastLogCacheStore.DFString.clear();
	FastLogSetup.WasSetup = false;
};

export function SetValue(fastVarName: string, value: string, type: FastVarType) {
	switch (type) {
		case FastVarType.FLog:
			FLog[fastVarName] = Convert.ToUInt16(value) || 0;
			break;
		case FastVarType.DFLog:
			FastLogCacheStore.DFLog.set(fastVarName, Convert.ToUInt16(value) || 0);
			break;
		case FastVarType.SFLog:
			SFLog[fastVarName] = Convert.ToUInt16(value) || 0;
			break;
		case FastVarType.FFlag:
			FFlag[fastVarName] = Convert.ToBoolean(value, false);
			break;
		case FastVarType.DFFlag:
			FastLogCacheStore.DFFlag.set(fastVarName, Convert.ToBoolean(value, false));
			break;
		case FastVarType.SFFlag:
			SFFlag[fastVarName] = Convert.ToBoolean(value, false);
			break;
		case FastVarType.FInt:
			FInt[fastVarName] = Convert.ToInt64(value) || 0;
			break;
		case FastVarType.DFInt:
			FastLogCacheStore.DFInt.set(fastVarName, Convert.ToInt64(value) || 0);
			break;
		case FastVarType.SFInt:
			SFInt[fastVarName] = Convert.ToInt64(value) || 0;
			break;
		case FastVarType.FString:
			FString[fastVarName] = value !== null ? value : '';
			break;
		case FastVarType.DFString:
			FastLogCacheStore.DFString.set(fastVarName, value !== null ? value : '');
			break;
		case FastVarType.SFString:
			SFString[fastVarName] = value !== null ? value : '';
			break;
	}
}

export function RegisterLogGroup(groupName: string) {
	FLog[groupName] = 1;
	return 1;
}

export function RegisterFlag(groupName: string) {
	FFlag[groupName] = true;

	return true;
}
