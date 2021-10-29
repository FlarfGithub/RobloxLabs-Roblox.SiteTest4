import { WebParsers } from '../../Web/Parsers/Roblox.Web.Parsers/WebParsers';

export class UserAgentHelper {
	public static CheckIsUserAgentRoblox(userAgent: string): bool {
		if (!userAgent) return false;
		userAgent = WebParsers.SanitizeData(userAgent);

		return userAgent.toLowerCase().includes('roblox');
	}

	public static CheckIfStringIsValidUrl(str: string): bool {
		if (!str) return false;
		str = WebParsers.SanitizeData(str);

		return (
			str
				.toLowerCase()
				.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) !== null
		);
	}
}
