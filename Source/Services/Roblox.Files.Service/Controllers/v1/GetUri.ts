/*
	FileName: GetUri.ts
	Written By: Nikita Nikolaevich Petko, originally by Jak Kozmik
	File Type: Module
	Description: Get Uri for the selected AssetHash

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

// Roblox.Files.Service.FilesService.GetUri(String Hash, Boolean IsRequestSecure)
// Request example:
/*

# Request
POST /v1/GetUri?apiKey=B639720C-189A-426F-95CC-5E4789DF69E6 HTTP/1.1
Host: files.api.roblox.com
content-type: application/json

{
	"hash": "String"
}

 */

import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import { __baseDirName } from '../../../../Assemblies/Common/Constants/Roblox.Common.Constants/Directories';
import { FASTFLAG, FFlag } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

dotenv.config({ path: __baseDirName + '/.env' });

FASTFLAG('RequireGlobalHTTPS');

export default {
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> | void => {
		if (request.method === 'OPTIONS') return response.status(200).send();
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
			return response.status(404).sendFile(__baseDirName + '/ErrorViews/FilesApi/Roblox.404.html');

		if (request.method !== 'POST')
			return response
				.status(405)
				.header({ Allow: 'POST' })
				.send({
					Message: `The requested resource does not support http method '${request.method}'.`,
				});

		if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
			return response.status(415).send({
				Message:
					"The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
			});

		if (!(<string>request.query.ApiKey).match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)) {
			response.statusMessage = 'ApiKey required in Guid format.';
			return response.status(401).send();
		}
		response.send();
	},
};
