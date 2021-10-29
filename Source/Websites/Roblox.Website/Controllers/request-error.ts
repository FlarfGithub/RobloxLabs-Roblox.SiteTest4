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
import { KeyValueMapping } from '../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';

export default {
	method: 'all',
	func: async (request: Request, response: Response): Promise<void> => {
		const user = await User.Get(-1);
		switch (parseInt(<string>request.query.code)) {
			case 400:
				return response.status(400).render('Error/BadRequest', {
					isUserAuthenicated: user !== null,
					authenticatedUser:
						{
							...(user ? user : {}),
							LanguageCode: 'en_us',
							LanguageName: 'English',
							Theme: 'dark',
						} || null,
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
			case 403:
				return response.status(403).render('Error/Forbidden', {
					isUserAuthenicated: user !== null,
					authenticatedUser: { ...(user ? user : {}), LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
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
						pageMeta: {
							banner: {
								Enabled: DFFlag('IsBannerEnabled'),
								Text: DFString('SiteBanner'),
							},
						},
					},
				});
			case 404:
				let cookie = KeyValueMapping.GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie);
				const authenticatedUser = await User.GetByCookie(cookie);
				if (!authenticatedUser && cookie !== undefined)
					response.clearCookie('.ROBLOSECURITY', { domain: 'sitetest4.robloxlabs.com' });
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
			case 500:
				const err = new Error('Default error.');
				return response.status(500).render('Error/InternalServerError', {
					isUserAuthenicated: user !== null,
					authenticatedUser: { ...(user ? user : {}), LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
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
					Error: {
						/* Place a generic stack in here until the request-error-id gets utilized. */
						Message: err.message,
						Stack: err.stack,
						Source: 'Roblox.Web.RobloxWebSite.Controllers.RequestErrorController',
						Function: 'Void RequestError(System.String, System.String, System.Int32)',
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
			default:
				return response.status(500).render('Error/BadRequest', {
					isUserAuthenicated: user !== null,
					authenticatedUser: { ...(user ? user : {}), LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
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
		}
	},
};
