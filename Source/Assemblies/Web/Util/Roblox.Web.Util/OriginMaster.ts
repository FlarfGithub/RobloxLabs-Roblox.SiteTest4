import { Response } from 'express';
import { FileBaseUrls } from '../../../Common/Constants/Roblox.Common.Constants/FileBaseUrls';
import { WebParsers } from '../../Parsers/Roblox.Web.Parsers/WebParsers';

export class OriginMaster {
	private _response: Response;

	public constructor(response: Response) {
		this._response = response;
	}

	public ExecuteOriginCheck(origin: string, protocol: string) {
		const host = new URL(origin || `http://no-origin.com`);

		if (host.hostname in FileBaseUrls) {
			this._response.setHeader('Access-Control-Allow-Origin', WebParsers.StripTheTrailingSlash(host.toString()));
			this._response.setHeader('Access-Control-Allow-Credentials', 'true');
		} else {
			if (!origin) this._response.setHeader('Access-Control-Allow-Origin', `${protocol}://www.sitetest4.robloxlabs.com`);
		}
	}
}

export class OriginMasterDescriptive {
	private _response: Response;
	private _appHost: string;

	public constructor(response: Response, host: string) {
		this._response = response;
		this._appHost = host;
	}
	public ExecuteOriginCheck(origin: string, protocol: string) {
		const host = new URL(origin || `http://no-origin.com`);

		if (host.hostname in FileBaseUrls) {
			this._response.setHeader('Access-Control-Allow-Origin', WebParsers.StripTheTrailingSlash(host.toString()));
			this._response.setHeader('Access-Control-Allow-Credentials', 'true');
		} else {
			if (!origin) this._response.setHeader('Access-Control-Allow-Origin', `${protocol}://${this._appHost}`);
		}
	}
}
