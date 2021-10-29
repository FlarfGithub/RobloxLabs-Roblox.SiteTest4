/*
	FileName: MapControllers.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Looks in a given folder for files that match the structure.

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

import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { DFLog, DYNAMIC_LOGGROUP, FASTLOG2 } from '../../Logging/FastLog';
import { __baseDirName } from '../../../../../Common/Constants/Roblox.Common.Constants/Directories';
import filestream from 'fs';
import { WebControllerParsers } from '../../../../Parsers/Roblox.Web.Parsers/WebControllerParsers';
import { Walkers } from '../../Walkers';

interface EndpointOpts {
	path?: string;
	apiName?: string;
}

DYNAMIC_LOGGROUP('Tasks');

const MapControllersV2 = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	return new Promise(async (resumeFunc) => {
		const directory = (opts !== undefined ? opts.path : __baseDirName + '\\Controllers') || __baseDirName + '\\Controllers';
		if (!filestream.existsSync(directory)) {
			FASTLOG2(
				DFLog('Tasks'),
				`[DFLog::Tasks] The directory %s for the api %s was not found, make sure you configured your directory correctly.`,
				directory,
				opts.apiName,
			);
			return resumeFunc();
		}
		const r = Walkers.WalkDirectory(directory);
		r.forEach((dir) => {
			if (dir.match(/.+\.js/)) {
				try {
					const data = require(dir);
					const controller = Walkers.WalkClassMap(data);
					if (controller) {
						WebControllerParsers.ControllerMethodParser(app, controller, opts.apiName);
					}
				} catch (e) {
					throw new Error('Error while parsing the given controller: ' + e.message + e.stack);
				}
			}
		});
		resumeFunc();
	});
};
export default MapControllersV2;
