import { Request, Response } from 'express';
import {
	DFFlag,
	DFString,
	DYNAMIC_FASTFLAGVARIABLE,
	DYNAMIC_FASTSTRING,
	DYNAMIC_FASTSTRINGVARIABLE,
} from '../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { User } from '../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';

// import { Roblox } from '../../../../Roblox.Api';
// import fs from 'fs';
// import a from 'axios';

DYNAMIC_FASTFLAGVARIABLE('IsBannerEnabled', false);
DYNAMIC_FASTSTRING('SiteBanner');
DYNAMIC_FASTSTRINGVARIABLE('DefaultModerationTitle', 'Warning');
DYNAMIC_FASTFLAGVARIABLE('DefaultModerationCanReactivate', true);
DYNAMIC_FASTFLAGVARIABLE('DefaultModerationIsPermanent', false);
DYNAMIC_FASTSTRINGVARIABLE('DefaultModerationNote', 'This is a test, contact appeals@roblox.com to re-enable this account.');
DYNAMIC_FASTSTRINGVARIABLE('DefaultModerationReviewedDate', '1/1/1970 00:00:00 PM');

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const securityToken = request.cookies['.ROBLOSECURITY'];
		const authenticatedUser = await User.GetByCookie(securityToken);
		if (!authenticatedUser) {
			if (securityToken !== undefined) response.clearCookie('.ROBLOSECURITY');
			return response.redirect('https://www.sitetest4.robloxlabs.com/NewLogin?ReturnUrl=%2fnot-approved');
		}
		if (!authenticatedUser.IsBanned) {
			return response.redirect('https://www.sitetest4.robloxlabs.com/');
		}
		const user = await User.Get(1);
		response.render('NotApproved', {
			isUserAuthenicated: user !== null,
			authenticatedUser: { ...user, LanguageCode: 'en_us', LanguageName: 'English', Theme: 'dark' } || null,
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
				moderation: {
					Id: 1,
					Title: DFString('DefaultModerationTitle'),
					CanReactivate: DFFlag('DefaultModerationCanReactivate'),
					IsPermanent: DFFlag('DefaultModerationIsPermanent'),
					Punishments: [{ Reason: 'Test', ItemName: 'Test' }],
					Note: DFString('DefaultModerationNote'),
					DateReviewed: DFString('DefaultModerationReviewedDate'),
				},
			},
		});
	},
};
