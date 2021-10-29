import { Response } from 'express';
import { BaseURL } from '../../../../Common/Roblox.Common/BaseUrl';
import { __baseDirName } from '../../../../Common/Constants/Roblox.Common.Constants/Directories';
import { DYNAMIC_FASTFLAGVARIABLE, DYNAMIC_FASTSTRINGVARIABLE, DFFlag, DFString } from '../Logging/FastLog';
import filestream from 'fs';

DYNAMIC_FASTFLAGVARIABLE('DoesTheWorldGetToViewTheSite', false);
DYNAMIC_FASTFLAGVARIABLE('CanAdminsBypassTheSystem', false);
DYNAMIC_FASTFLAGVARIABLE('NoMaintenance', false);
DYNAMIC_FASTSTRINGVARIABLE('RobloxLabsSecurityToken', 'ljWby+/HVsZXJLfRkoljWby+/HVsZXJLfRko9mPQ9mPQ==');

export class CommonValidator<TResponse extends Response> {
	private readonly _response: TResponse;

	public constructor(response: TResponse) {
		this._response = response;
	}

	public ValidateDoesTheWorldGetToViewTheSite(
		method: string,
		returnUrl: string,
		secToken: string,
		doNotRedirect = false,
		allowNoMaintenance = false,
	) {
		if (method === 'OPTIONS') return true;
		if (
			DFFlag('CanAdminsBypassTheSystem') &&
			(secToken === DFString('RobloxLabsSecurityToken') || secToken === encodeURIComponent(DFString('RobloxLabsSecurityToken')))
		)
			return true;
		if (!DFFlag('NoMaintenance') && DFFlag('DoesTheWorldGetToViewTheSite')) return true;

		if (!DFFlag('DoesTheWorldGetToViewTheSite')) {
			if (DFFlag('NoMaintenance') && allowNoMaintenance) {
				this._response.status(503).send('The service is unavailable.');
				return false;
			}
			if (!doNotRedirect) this._response.redirect(BaseURL.GetSecureBaseURL() + '/login/maintenance?ReturnUrl=' + returnUrl);
			return false;
		}
		return true;
	}

	public IsFileStaticFile(baseUrl: string, file: string) {
		return new Promise((resumeFunction) => {
			const url = `${__baseDirName}${!baseUrl.startsWith('/') ? '/' : ''}${baseUrl}${
				baseUrl.endsWith('/') && file.startsWith('/') ? file.replace('/', '') : file
			}`;
			filestream.stat(url, function (_error, fileStats) {
				resumeFunction(fileStats && fileStats.isFile());
			});
		});
	}
}
