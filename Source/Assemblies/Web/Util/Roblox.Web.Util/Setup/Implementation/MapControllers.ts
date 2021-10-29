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

import { Express as IApplicationBuilder, Request, Response } from 'express-serve-static-core';
import { DFLog, DYNAMIC_LOGGROUP, FASTLOG2, FASTLOG3, FASTLOGS, SFLog } from '../../Logging/FastLog';
import { __baseDirName } from '../../../../../Common/Constants/Roblox.Common.Constants/Directories';
import filestream from 'fs';
import { Walkers } from '../../Walkers';
import { FastLogGlobal } from '../../Logging/FastLogGlobal';

interface EndpointOpts {
	path?: string;
	logSetups?: boolean;
	apiName?: string;
}

FastLogGlobal.IncludeHostLogLevels();

DYNAMIC_LOGGROUP('Tasks');

const MapControllers = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	return new Promise(async (resumeFunc) => {
		const directory = (opts !== undefined ? opts.path : __baseDirName + '/Controllers') || __baseDirName + '/Controllers';
		if (!filestream.existsSync(directory)) {
			FASTLOG2(
				DFLog('Tasks'),
				`[DFLog::Tasks] The directory %s for the api %s was not found, make sure you configured your directory correctly.`,
				directory,
				opts.apiName,
			);
			return resumeFunc();
		}
		const files = Walkers.WalkDirectory(directory);
		let count = 0;
		files.forEach((v) => {
			let name = v.split('\\').join('/');
			name = name.replace(directory, '');
			if (name.match(/.+\.js/)) {
				name = name.replace('.js', '');
				name = name.split('_P-').join(':');
				name = name.split('\\').join('/');
				if (name === '/__pageIndex') name = '/';
				let map: {
					default: { func: (request: Request, Response: Response) => unknown; method: string };
				};

				try {
					map = require(v);
				} catch (err) {
					return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.stack);
				}
				let func: (request: Request, Response: Response) => unknown;
				let method: string;
				if (map.default) {
					if (map.default.func) func = map.default.func;
					else return;
					if (map.default.method) method = map.default.method.toLowerCase();
					else return;
					count++;
					try {
						if (method === 'get') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping GET %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.get(name, func);
						} else if (method === 'head') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping HEAD %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.head(name, func);
						} else if (method === 'post') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping POST %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.post(name, func);
						} else if (method === 'put') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping PUT %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.put(name, func);
						} else if (method === 'delete') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping DELETE %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.delete(name, func);
						} else if (method === 'connect') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping CONNECT %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.connect(name, func);
						} else if (method === 'options') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping OPTIONS %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.options(name, func);
						} else if (method === 'trace') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping TRACE %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.trace(name, func);
						} else if (method === 'patch') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping PATCH %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.patch(name, func);
						} else if (method === 'all') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping ALL %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.all(name, func);
						} else {
							return FASTLOGS(SFLog[opts.apiName], '[SFLog::%s] Error requesting Controller.', opts.apiName);
						}
					} catch (err) {
						return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.stack);
					}
				} else {
					return FASTLOGS(SFLog[opts.apiName], '[SFLog::%s] This Controller had no default export.', opts.apiName);
				}
			}
		});
		FASTLOG3(SFLog[opts.apiName], `[SFLog::%s] https://%s has %d controller(s)`, opts.apiName, opts.apiName, count);
		resumeFunc();
	});
};
export default MapControllers;
