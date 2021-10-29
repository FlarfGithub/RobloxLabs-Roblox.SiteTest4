import { NextFunction, Request, Response } from 'express';
import { DFFlag, DFString, DYNAMIC_FASTFLAG, DYNAMIC_FASTFLAGVARIABLE } from '../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { User } from '../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';
import { KeyValueMapping } from '../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';

DYNAMIC_FASTFLAGVARIABLE('WWWIndexPageControllerEnabled', false);
DYNAMIC_FASTFLAG('DisplayNamesEnabled');
DYNAMIC_FASTFLAGVARIABLE('IsSignupFormDarkThemeEnabled', true);

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		let cookie = KeyValueMapping.GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie);
		const authenticatedUser = await User.GetByCookie(cookie);
		if (!authenticatedUser && cookie !== undefined) response.clearCookie('.ROBLOSECURITY', { domain: '.sitetest4.robloxlabs.com' });
		return response.status(200).render('Support', {
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
	},
};
