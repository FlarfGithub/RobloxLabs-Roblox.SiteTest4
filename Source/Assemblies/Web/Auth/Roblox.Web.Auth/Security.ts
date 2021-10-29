import { Request } from 'express';
import { KeyValueMapping } from '../../../Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';
import { User } from '../../../Platform/Membership/Roblox.Platform.Membership/User';

export class Security {
	public static GetSecurityToken(request: Request) {
		return KeyValueMapping.GetValueFromCookieString('.ROBLOSECURITY', request.headers.cookie || '');
	}

	public static async GetUserFromCookie(request: Request<any, any, any, any, any>) {
		return await User.GetByCookie(Security.GetSecurityToken(request));
	}
}
