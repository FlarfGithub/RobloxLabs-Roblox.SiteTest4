/*
	FileName: asset.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://www.sitetest4.robloxlabs.com/asset/, Redirects to assetdelivery

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
import { DFFlag, DFString } from '../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { User } from '../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';

// import { Roblox } from '../../../../Roblox.Api';
// import fs from 'fs';
// import a from 'axios';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const securityToken = request.cookies['.ROBLOSECURITY'];
		const authenticatedUser = await User.GetByCookie(securityToken);
		if (!authenticatedUser) {
			if (securityToken !== undefined) response.clearCookie('.ROBLOSECURITY');
			return response.redirect('https://www.sitetest4.robloxlabs.com/Login');
		}
		return response.render('Home', {
			isUserAuthenicated: authenticatedUser !== null,
			authenticatedUser: { ...authenticatedUser, LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
			sessionUser: {
				LanguageCode: 'en_us',
				LanguageName: 'English',
				Device: {
					DeviceName: 'computer',
					IsInApp: false,
					IsDesktop: true,
					IsPhone: false,
					IsTablet: false,
					IsConsole: false,
					IsAndroidApp: false,
					IsIosApp: false,
					IsUWPApp: false,
					IsXboxApp: false,
					IsAmazonApp: false,
					IsWin32App: false,
					IsStudio: false,
					IsGameClientBrowser: false,
					IsIosDevice: false,
					IsAndroidDevice: false,
					IsUniversalApp: false,
				},
			},
			globalMeta: {
				Experiments: {
					DisplayNamesEnabled: true,
				},
			},
			pageMeta: {
				banner: {
					Enabled: DFFlag('IsBannerEnabled'),
					Text: DFString('SiteBanner'),
				},
			},
		});
		// a.get(`https://www.roblox.com/home`, { headers: { ...req.headers, host: 'www.roblox.com' } })
		// 	.then((re) => {
		// 		const newbody = re.data.split('roblox.com').join('sitetest4.robloxlabs.com');
		// 		const newheaders = JSON.parse(JSON.stringify(re.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));

		// 		return res.header(newheaders).send(newbody);
		// 	})
		// 	.catch((e) => {
		// 		const newheaders = JSON.parse(JSON.stringify(e.response.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
		// 		return res.header(newheaders).status(e.response.status).send(e.response.data);
		// 	});
		// let template = fs.readFileSync(
		// 	Roblox.Api.Constants.RobloxDirectories.__iBaseDirectory + '/InternalCDN/Roblox.UserProfile.html',
		// 	{ encoding: 'utf-8' },
		// );
		// template = template.split('<USERIDHERE>').join(userId.toString());
		// return res.send(template);
	},
};
