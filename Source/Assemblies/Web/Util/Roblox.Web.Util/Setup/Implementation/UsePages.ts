/*
	FileName: UsePages.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Essentially just Express.static

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
import { static as Pages } from 'express';
import { OutgoingMessage } from 'http';
import { __baseDirName } from '../../../../../Common/Constants/Roblox.Common.Constants/Directories';
import fs from 'fs';
import { FASTLOGS, FLog, LOGGROUP } from '../../Logging/FastLog';

interface PageDirOpts {
	path?: string;
}
interface PageOpts<R extends OutgoingMessage = OutgoingMessage> {
	cacheControl?: boolean;
	dotfiles?: string;
	etag?: boolean;
	extensions?: string[] | false;
	fallthrough?: boolean;
	immutable?: boolean;
	index?: boolean | string | string[];
	lastModified?: boolean;
	maxAge?: number | string;
	redirect?: boolean;
	setHeaders?: (res: R, path: string, stat: unknown) => unknown;
}

LOGGROUP('Pages');

const UsePages = (app: IApplicationBuilder, opts: PageDirOpts, PagesOpts: PageOpts): Promise<void> => {
	return new Promise((r) => {
		const path = (opts !== undefined ? opts.path : __baseDirName + '/StaticPages') || __baseDirName + '/StaticPages';
		if (!fs.existsSync(path)) {
			FASTLOGS(
				FLog['Pages'],
				`[FLog::Pages] The directory %s was not found, make sure you configured your directory correctly. Static pages, so this will that return ctx::resumeFunc()`,
				path,
			);
		}
		app.use(Pages(path, PagesOpts));
		r();
	});
};
export default UsePages;
