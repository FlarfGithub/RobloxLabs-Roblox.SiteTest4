export class WebParsers {
	public static StripTheTrailingSlash(str: string) {
		return str.replace(/\/$/, '');
	}
	public static SanitizeData(data: any) {
		if (typeof data !== 'string') return null;
		return (data || '').replace(/[^a-z0-9+]+/gi, '');
	}
}
