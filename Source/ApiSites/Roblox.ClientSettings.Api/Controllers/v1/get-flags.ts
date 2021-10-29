/*
	FileName: get-flags.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Client settings, such as WebSettings etc.

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	NOTICE DO NOT PUT CSRF PROTECTION ON THIS!

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

import { ClientSettings } from '../../../../Assemblies/Platform/ClientSettings/Roblox.Platform.ClientSettings/Implementation/ClientSettingsUtil';
import {
	DFFlag,
	DYNAMIC_FASTFLAGVARIABLE,
	FASTFLAG,
	FASTLOG,
	FASTLOG1,
	FASTLOGS,
	FFlag,
	FLog,
	FSettings,
	LOGGROUP,
} from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

FASTFLAG('RequireGlobalHTTPS');

DYNAMIC_FASTFLAGVARIABLE('IsClientSettingsAPIEnabled', true);

LOGGROUP('ClientSettingsAPIV1');

export default {
	method: 'all',
	func: (request, response): void => {
		if (!DFFlag('IsClientSettingsAPIEnabled')) {
			FASTLOG(FLog['ClientSettingsAPIV1'], '[FLog::ClientSettingsAPIV1] The service is disabled currently.');
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});
		}

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });

		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
			FASTLOG(FLog['ClientSettingsAPIV1'], '[FLog::ClientSettingsAPIV1] HTTPS was not given where it was needed.');
			return response.status(403).send({ success: false, message: 'HTTPS Required.' });
		}

		if (request.method !== 'GET') {
			FASTLOGS(FLog['ClientSettingsAPIV1'], `[FLog::ClientSettingsAPIV1] The method %s is not supported`, request.method);
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support https method '${request.method}'.`,
			});
		}

		if (!request.query['settingsGroup']) {
			FASTLOG(FLog['ClientSettingsAPIV1'], '[FLog::ClientSettingsAPIV1] settingsGroup did not exist on the request.');
			return response.status(400).send({ success: false, message: 'settingsGroup was not supplied' });
		}

		let found = false;
		FSettings.forEach((v) => {
			if (v === request.query['settingsGroup']) {
				found = true;
			}
		});

		if (!found) {
			FASTLOGS(
				FLog['ClientSettingsAPIV1'],
				`[FLog::ClientSettingsAPIV1] The settingsGroup matching %s was not found.`,
				request.query['settingsGroup'],
			);
			return response.status(404).send({
				success: false,
				message: 'settingsGroup not found.',
				userfacingmessage: `The settingsGroup matching ${request.query['settingsGroup']} was not found.`,
			});
		}
		FASTLOG1(
			FLog['ClientSettingsAPIV1'],
			`[FLog::ClientSettingsAPIV1] Successfully got settings for %s`,
			request.query['settingsGroup'],
		);
		return response.status(200).send(ClientSettings.GetAllSettings(request.query['settingsGroup']));
	},
};
