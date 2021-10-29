/*
	FileName: DeveloperExceptionPage.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Error.ashx

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

/**
 *
 * @param app The app you wish to add to
 */
const DeveloperExceptionPage = (app: IApplicationBuilder): Promise<void> => {
	return new Promise((r) => {
		app.all('/Error.ashx', (request, response) => {
			response.status(request.query.code !== undefined ? parseInt(request.query.code as string) || 400 : 400);
			const msg = request.query.message;
			response.send({
				Error: parseInt(request.query.code as string) || response.statusCode,
				Message: `${msg || (response.statusCode === 400 ? 'BadRequest' : response.statusCode === 404 ? 'NotFound' : '')}`,
				Redirect: request.query.redirect
					? `Redirect from: ${
							(request.query.redirect as string).split(';')[0].startsWith('https')
								? (request.query.redirect as string).split(';')[0]
								: 'unknownuri'
					  } to ${
							((request.query.redirect as string).split(';')[1]
								? (request.query.redirect as string).split(';')[1].startsWith('https')
									? (request.query.redirect as string).split(';')[1]
									: 'unknownuri'
								: 'unknownuri') || 'unknownuri'
					  }`
					: undefined,
			});
		});
		r();
	});
};
export default DeveloperExceptionPage;
