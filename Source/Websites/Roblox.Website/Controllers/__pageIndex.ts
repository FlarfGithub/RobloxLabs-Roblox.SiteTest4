import { NextFunction, Request, Response } from 'express';
import { DFFlag, DYNAMIC_FASTFLAG, DYNAMIC_FASTFLAGVARIABLE } from '../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { SessionUser } from '../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/SessionUser';
import { User } from '../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';

DYNAMIC_FASTFLAGVARIABLE('WWWIndexPageControllerEnabled', false);
DYNAMIC_FASTFLAG('DisplayNamesEnabled');
DYNAMIC_FASTFLAGVARIABLE('IsSignupFormDarkThemeEnabled', true);

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		if (!DFFlag('WWWIndexPageControllerEnabled')) return next(); // TODO: Remove this when the controller is fully set-up.
		const securityToken = request.cookies['.ROBLOSECURITY'];
		if ((await User.GetByCookie(securityToken)) !== null) {
			return response.redirect('/home'); // NOTICE: Do not do this in the middleware, it creates awful captures.
		}
		if (securityToken !== undefined) response.clearCookie('.ROBLOSECURITY', { domain: 'sitetest4.robloxlabs.com' }); // We need them to clear that cookie, this will not be needed when it checks by user, unlike just checking for it's presence...
		/* Session User fetch, use SessionUser.GetOrCreate(IP) -- This will get the user by IP, or will create one with the given IP, IF they have a browser tracker, then try fetch that. */
		const sessionUser = await SessionUser.GetOrCreateByIpAddress(request.ip);
		if (sessionUser === null) {
			// ACK! Something went wrong, redirect to the 500 page.
			return response.redirect('/request-error?code=500'); // Add Id here when it is implemented.
		}
		return response.render('Signup', {
			sessionUser: { ...sessionUser, Device: {} },
			globalMeta: {
				Experiments: {
					DisplayNamesEnabled: DFFlag('DisplayNamesEnabled'),
					IsSignupFormDarkThemeEnabled: DFFlag('IsSignupFormDarkThemeEnabled'),
				},
			},
			pageMeta: {
				MachineID: 'WEB1447',
			},
		});
	},
};
