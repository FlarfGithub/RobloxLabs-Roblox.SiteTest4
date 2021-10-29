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
import { DFFlag, DFString, DYNAMIC_FASTFLAG, DYNAMIC_FASTSTRING } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { User } from '../../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';
import { KeyValueMapping } from '../../../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';

DYNAMIC_FASTFLAG('IsBannerEnabled');
DYNAMIC_FASTSTRING('SiteBanner');

export default {
	method: 'all',
	func: async (request: Request, response: Response): Promise<void> => {
		let cookie = KeyValueMapping.GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie);
		const authenticatedUser = await User.GetByCookie(cookie);
		if (!authenticatedUser && cookie !== undefined) response.clearCookie('.ROBLOSECURITY', { domain: 'sitetest4.robloxlabs.com' });
		const user = await User.Get(parseInt(request.params.userId));
		if (!user || user.IsBanned) return response.redirect('/request-error?code=404');
		response.render('Profile', {
			isUserAuthenicated: authenticatedUser !== null,
			authenticatedUser:
				{
					...authenticatedUser,
					LanguageCode: 'en_us',
					LanguageName: 'English',
					Theme: 'dark',
					CanAddUser: (Id: number) => false,
					HasOutgoingFriendRequestForId: (Id: number) => false,
					MayFollowUser: (Id: number) => false,
					IsFollowing: (Id: number) => true,
					CanMessageUser: (Id: number) => false,
					CanTradeWith: (Id: number) => false,
					IsUserBlocked: (Id: number) => false,
					IsChatPrivacy: (Enum: string) => false,
					CsrfToken: 'test123',
				} || null,
			profileUser:
				{
					...user,
					LanguageCode: 'en_us',
					LanguageName: 'English',
					Theme: 'dark',
					PreviousUserNames: ['nsg1', 'nsg2'],
					IsFriendsWith: (Id: number) => true,
					HasOutgoingFriendRequestForId: (Id: number) => false,
					CanAddUser: (Id: number) => false,
					CanRecievePrivateMessages: () => true,
					IsChatPrivacy: (Enum: string) => false,
					AvatarAccoutrementItems: [],
					FavouriteGames: [],
					Games: [],
					CsrfToken: 'test123',
					ImageHash: '00cf1b4c991080f917030d1a42783f20',
					FriendsCount: 0,
					FollowersCount: 500000000,
					FollowingCount: 0,
				} || null,
			sessionUser: {
				LanguageCode: 'en_us',
				LanguageName: 'English',
				CsrfToken: 'test123',
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
	},
};
