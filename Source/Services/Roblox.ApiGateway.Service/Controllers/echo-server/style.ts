import { Request, Response } from 'express';
import { User } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		const user = await User.Get(1);

		response.render('Modals', {
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
			MachineId: 'WEB1447',
			globalMeta: {
				Experiments: {
					DisplayNamesEnabled: true,
				},
			},
		});
	},
};
