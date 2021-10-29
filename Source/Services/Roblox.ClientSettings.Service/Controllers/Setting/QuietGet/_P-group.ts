/*
	FileName: _P-group.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://clientsettings.api.sitetest4.robloxlabs.com/Setting/QuietGet/:group/, return client settings for the given group

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import { Request, Response } from 'express';
import { ApiKeyValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';
import { InputValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/InputValidator';
import { DFLog, FASTLOGS } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { ClientSettings } from '../../../../../Assemblies/Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';
import { KeyValueMapping } from '../../../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';
import { WebParsers } from '../../../../../Assemblies/Web/Parsers/Roblox.Web.Parsers/WebParsers';

export default {
	method: 'all',
	func: (request: Request, response: Response) => {
		const inputValidatorClient = new InputValidator();

		const group = WebParsers.SanitizeData(request.params.group);
		const FSettings = ClientSettings.GetFSettings();
		FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] ClientSettings QuietGet Settings got group %s.', group);
		if (!inputValidatorClient.CheckIfValueIsIncludedInArray(group, FSettings))
			return response.status(503).send('The service is unavailable.');
		const allGroupSettings = ClientSettings.GetAllSettings(group || 'Blank');

		const apiKeyValidatorClient = new ApiKeyValidator(response, 'The service is unavailable.');

		if (
			!apiKeyValidatorClient.MultiValidate(
				KeyValueMapping.FetchKeyFromObjectCaseInsensitive<string>(request.query, 'ApiKey'),
				['D6925E56-BFB9-4908-AAA2-A5B1EC4B2D79', '76E5A40C-3AE1-4028-9F10-7C62520BD94F'],
				true,
			)
		)
			return;
		if (!allGroupSettings) return response.status(503).send('The service is unavailable.');
		const parsedGroupMappedSettings = new Map<string, Object>(Object.entries(allGroupSettings));
		const outputGroupSettings: { [k: string]: unknown } = {};
		parsedGroupMappedSettings.forEach((_value, key) => {
			if (key === 'FFlag') {
				const fflag = new Map<string, boolean>(Object.entries(allGroupSettings[key]));
				fflag.forEach((flagValue, flagName) => {
					outputGroupSettings['FFlag' + flagName] = flagValue === true ? 'True' : 'False';
				});
			} else if (key === 'DFFlag') {
				const dfflag = new Map<string, boolean>(Object.entries(allGroupSettings[key]));
				dfflag.forEach((flagValue, flagName) => {
					outputGroupSettings['DFFlag' + flagName] = flagValue === true ? 'True' : 'False';
				});
			} else if (key === 'SFFlag') {
				const sfflag = new Map<string, boolean>(Object.entries(allGroupSettings[key]));
				sfflag.forEach((flagValue, flagName) => {
					outputGroupSettings['SFFlag' + flagName] = flagValue === true ? 'True' : 'False';
				});
			} else if (key === 'FLog') {
				const flog = new Map<string, number>(Object.entries(allGroupSettings[key]));
				flog.forEach((flagValue, flagName) => {
					outputGroupSettings['FLog' + flagName] = flagValue.toString();
				});
			} else if (key === 'DFLog') {
				const dflog = new Map<string, number>(Object.entries(allGroupSettings[key]));
				dflog.forEach((flagValue, flagName) => {
					outputGroupSettings['DFLog' + flagName] = flagValue.toString();
				});
			} else if (key === 'SFLog') {
				const sflog = new Map<string, number>(Object.entries(allGroupSettings[key]));
				sflog.forEach((flagValue, flagName) => {
					outputGroupSettings['SFLog' + flagName] = flagValue.toString();
				});
			} else if (key === 'FInt') {
				const fint = new Map<string, number>(Object.entries(allGroupSettings[key]));
				fint.forEach((flagValue, flagName) => {
					outputGroupSettings['FInt' + flagName] = flagValue.toString();
				});
			} else if (key === 'DFInt') {
				const dfint = new Map<string, number>(Object.entries(allGroupSettings[key]));
				dfint.forEach((flagValue, flagName) => {
					outputGroupSettings['DFInt' + flagName] = flagValue.toString();
				});
			} else if (key === 'SFInt') {
				const sfint = new Map<string, number>(Object.entries(allGroupSettings[key]));
				sfint.forEach((flagValue, flagName) => {
					outputGroupSettings['SFInt' + flagName] = flagValue.toString();
				});
			} else if (key === 'FString') {
				const fstring = new Map<string, string>(Object.entries(allGroupSettings[key]));
				fstring.forEach((flagValue, flagName) => {
					outputGroupSettings['FString' + flagName] = flagValue;
				});
			} else if (key === 'DFString') {
				const dfstring = new Map<string, string>(Object.entries(allGroupSettings[key]));
				dfstring.forEach((flagValue, flagName) => {
					outputGroupSettings['DFString' + flagName] = flagValue;
				});
			} else if (key === 'SFString') {
				const sfstring = new Map<string, string>(Object.entries(allGroupSettings[key]));
				sfstring.forEach((flagValue, flagName) => {
					outputGroupSettings['SFString' + flagName] = flagValue;
				});
			} else if (key === 'FVariable') {
				const fvariable = new Map<string, unknown>(Object.entries(allGroupSettings[key]));
				fvariable.forEach((flagValue, flagName) => {
					let value: unknown = flagValue;
					if (typeof flagValue === 'boolean') value = flagValue ? 'True' : 'False';
					if (typeof flagValue === 'number') value = (<number>flagValue).toString();
					outputGroupSettings[flagName] = value;
				});
			} else if (key === 'FPFilter') {
				const fpfilter = new Map<string, { Value: unknown; Ids: number[]; Prefix: string }>(Object.entries(allGroupSettings[key]));
				fpfilter.forEach((flagValue, flagName) => {
					const placeFilterFlagName = flagValue.Prefix + flagName + '_PlaceFilter';

					if (typeof flagValue.Value === 'boolean') {
						let placeFilterFlagValue = flagValue.Value ? 'True;' : 'False;';
						let iterator = 0;
						flagValue.Ids.forEach((placeId) => {
							iterator++;
							placeFilterFlagValue += placeId.toString() + (iterator !== flagValue.Ids.length ? ';' : '');
						});
						outputGroupSettings[placeFilterFlagName] = placeFilterFlagValue;
					} else if (typeof flagValue.Value === 'number') {
						let placeFilterFlagValue = flagValue.Value.toString() + ';';
						let iterator = 0;
						flagValue.Ids.forEach((placeId) => {
							iterator++;
							placeFilterFlagValue += placeId.toString() + (iterator !== flagValue.Ids.length ? ';' : '');
						});
						outputGroupSettings[placeFilterFlagName] = placeFilterFlagValue;
					} else {
						let placeFilterFlagValue = flagValue.Value + ';';
						let iterator = 0;
						flagValue.Ids.forEach((placeId) => {
							iterator++;
							placeFilterFlagValue += placeId.toString() + (iterator !== flagValue.Ids.length ? ';' : '');
						});
						outputGroupSettings[placeFilterFlagName] = placeFilterFlagValue;
					}
				});
			} else {
				const flagValues = new Map<string, unknown>(Object.entries(allGroupSettings[key]));
				flagValues.forEach((flagValue, flagName) => {
					let value: unknown = flagValue;
					if (typeof flagValue === 'boolean') value = flagValue ? 'True' : 'False';
					if (typeof flagValue === 'number') value = (<number>flagValue).toString();
					outputGroupSettings[flagName] = value;
				});
			}
		});
		response.send(outputGroupSettings);
	},
};
