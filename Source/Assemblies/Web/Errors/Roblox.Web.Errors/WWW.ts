/*
	FileName: www.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: root 404 middleware

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
import { DFFlag, DFString, DYNAMIC_FASTFLAG, DYNAMIC_FASTSTRING } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { User } from '../../../Platform/Membership/Roblox.Platform.Membership/User';
import { InputValidator } from '../../Util/Roblox.Web.Util/Validators/InputValidator';
import { KeyValueMapping } from '../../../Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';
import { GUID } from '../../Util/Roblox.Web.Util/Generators/Guid';

DYNAMIC_FASTFLAG('IsBannerEnabled');
DYNAMIC_FASTSTRING('SiteBanner');

export const WWW = async (request: Request, response: Response) => {
	const inputValidatorClient = new InputValidator();

	if (request.headers['user-agent'] && request.headers['user-agent'].includes('RobloxStudio')) {
		return response.status(200).send('not found');
	}
	if (inputValidatorClient.CheckDoesStringIncludeASPExtension(request.path)) {
		return response.redirect(`/request-error?id=${GUID.GenerateUUIDV4()}&mode=&code=404`);
	}
	let cookie = KeyValueMapping.GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie);
	const authenticatedUser = await User.GetByCookie(cookie);
	if (!authenticatedUser && cookie !== undefined) response.clearCookie('.ROBLOSECURITY', { domain: '.sitetest4.robloxlabs.com' });
	return response.status(404).render('Error/NotFound', {
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
		MachineId: 'WEB1447',
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
};
