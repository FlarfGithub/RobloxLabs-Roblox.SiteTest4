/*
	FileName: BodyColors.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://asssetgame.sitetest4.robloxlabs.com/Asset/BodyColors.ashx, Gets a xml body colors object based on userId or userName (Soon to be obselete)

	Notice: At the moment, anything in /Asset/ will just fetch from production, this will change when this gets a fully working DB

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
import { CachePolicy } from '../../../../Assemblies/Http/HttpClientInvoker/Roblox.Http.HttpClientInvoker/Models/IClientRequest';
import { AvatarRequestProcessor } from '../../../../Assemblies/Web/Avatars/Roblox.Web.Avatars/AvatarRequestProcessor';
import { BodyColorsRequest } from '../../Models/Game/BodyColorsRequest';

export default {
	method: 'all',
	func: async (request: Request<null, string, null, BodyColorsRequest>, response: Response<string>) => {
		const cachedRequestProcessor = new AvatarRequestProcessor(CachePolicy.StaleAfterOneMinute, response);

		var [UserID, UserName] = cachedRequestProcessor.ExtractDataFromQueryStringForBodyColorsRequest(request);

		await cachedRequestProcessor.GetAvatarBodyColorsAsync(UserID, UserName);
	},
};
