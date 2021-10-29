/*
	FileName: startup.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: A mock of ASP.NET and Servers.FX

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
import { json as jparser, Response } from 'express';
import bparser from 'body-parser';
import cparser from 'cookie-parser';
import DeveloperExceptionPage from '../Implementation/DeveloperExceptionPage';
import UseRouting from '../Implementation/UseRouting';
import MapControllers from '../Implementation/MapControllers';
import UsePages from '../Implementation/UsePages';
import { DFFlag, DFLog, DYNAMIC_LOGGROUP, FASTLOG2, FASTLOG3, SFLog } from '../../Logging/FastLog';
import UseFileList from '../Implementation/UserFileList';
import MapControllersV2 from '../Implementation/MapControllersV2';
import { __baseDirName, __sslDirName } from '../../../../../Common/Constants/Roblox.Common.Constants/Directories';
import { IConfigOptions } from '../Interfaces/IConfigOptions';
import { FastLogGlobal } from '../../Logging/FastLogGlobal';
import { Server as HTTPServer } from 'http';
import SSL, { Server as SSLServer } from 'https';
import SSL2 from 'spdy';
import filestream from 'fs';
import { MapWSS } from '../Implementation/MapWebsockets';

FastLogGlobal.IncludeHostLogLevels();

DYNAMIC_LOGGROUP('Tasks');
export class SystemSDK {
	public static async Configure(opts: IConfigOptions): Promise<void> {
		try {
			opts.app.disable('etag');
			opts.app.disable('case sensitive routing');
			opts.app.enable('trust proxy');
			opts.app.disable('x-powered-by');
			opts.app.disable('strict routing');
			opts.app.use(cparser());
			if (!opts.doNotUseJSON) opts.app.use(jparser({ strict: false }));
			if (!opts.doNotUseUrlEncoded) opts.app.use(bparser.urlencoded({ extended: false }));
			if (opts.UsePages) {
				await UsePages(opts.app, opts.PagesOpts, opts.PageOpts);
			}
			if (opts.fileListings) {
				await UseFileList(opts.app, opts.PagesOpts);
			}
			if (opts.UseRouting) {
				await UseRouting(opts.app, opts.RoutingOpts);
			}
			if (opts.UseEndpoints) {
				if (opts.useBetaControllerMapping) {
					await MapControllersV2(opts.app, opts.EndpointOpts);
				} else {
					await MapControllers(opts.app, opts.EndpointOpts);
				}
			}
			if (opts.errorpage) {
				await DeveloperExceptionPage(opts.app);
			}
		} catch (e) {
			FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Message: %s, Stack: %s`, e.message, e.stack);
		}
	}

	public static MetadataBuilder(
		app: IApplicationBuilder,
		PagesDir: string,
		EndpointsDir: string,
		apiName: string,
		errorpage?: boolean,
		fileListings?: boolean,
		useNewControllers?: boolean,
		doNotParseJSON?: boolean,
		doNotParseFORM?: boolean,
		doNotUseEndpoints?: boolean,
	) {
		return {
			app: app,
			UsePages: true,
			PageOpts: {
				etag: false,
				redirect: true,
				lastModified: false,
				setHeaders: (response: Response): void => {
					response.set('x-powered-by', 'ASP.NET');
					response.set('server', 'Amazon S3');
				},
			},
			UseRouting: true,
			PagesOpts: {
				path: __baseDirName + PagesDir,
			},
			EndpointOpts: {
				path: __baseDirName + EndpointsDir,
				logSetups: true,
				apiName: apiName,
			},
			errorpage: errorpage,
			fileListings,
			useBetaControllerMapping: useNewControllers,
			doNotUseUrlEncoded: doNotParseFORM,
			doNotUseJSON: doNotParseJSON,
			UseEndpoints: !doNotUseEndpoints,
		} as unknown as IConfigOptions;
	}

	public static ServerStarter(
		app: IApplicationBuilder,
		name: string,
		useHttps: bool = true,
		useHttp: bool = true,
		httpPort: int = 80,
		httpsPort: int = 443,
	): [HTTPServer, SSLServer] {
		try {
			let httpsServer: SSLServer;
			let httpServer: HTTPServer;
			if (useHttps)
				httpsServer = (DFFlag('GlobalHTTP2Enabled') ? SSL2 : SSL)
					.createServer(
						{
							cert: filestream.readFileSync(__sslDirName + '/ST4.crt', 'utf-8'),
							key: filestream.readFileSync(__sslDirName + '/ST4.key', 'utf-8'),
							ca: [filestream.readFileSync(__sslDirName + '/rootCA.crt', 'utf-8')],
							passphrase: process.env['ST4_pw'],
						},
						app,
					)
					.listen(httpsPort, name, () => FASTLOG3(SFLog[name], `[SFLog::%s] https://%s:%d Started`, name, name, httpsPort));
			if (useHttp)
				httpServer = app.listen(httpPort, name, () =>
					FASTLOG3(SFLog[name], `[SFLog::%s] http://%s:%d Started`, name, name, httpPort),
				);
			return [httpServer, httpsServer];
		} catch (err) {
			throw new Error(err);
		}
	}

	public static async WebsocketStarter(httpServer: HTTPServer, httpsServer: SSLServer, dir: string, apiName: string) {
		await MapWSS(httpServer, httpsServer, {
			path: __baseDirName + dir,
			shouldHandleUpgrade: true,
			apiName: apiName,
			logSetups: true,
		});
	}
}
