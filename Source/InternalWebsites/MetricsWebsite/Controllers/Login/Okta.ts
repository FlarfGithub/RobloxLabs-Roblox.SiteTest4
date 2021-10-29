import { Request, Response } from 'express';
import { BaseURL } from '../../../../Assemblies/Common/Roblox.Common/BaseUrl';
import { DFString, DYNAMIC_FASTSTRINGVARIABLE } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import Base64 from 'crypto-js/enc-base64';
import { MD5 } from 'crypto-js';
import { HashingClient } from '../../../../Assemblies/Data/Hashing/Roblox.Data.Hashing/HashingClient';
import { Nonce } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Generators/Nonce';

DYNAMIC_FASTSTRINGVARIABLE('OktaClientID', '');

export default {
	method: 'all',
	func: async (request: Request<null, null, null, OktaRequest>, response: Response) => {
		const [nonceInit, nonce] = Nonce.GenerateBase64EncodedNonce();
		const req = JSON.stringify({
			returnUrl: request.query.returnUrl || '/',
			nonce: nonce,
			issuer: BaseURL.ConstructServicePathFromHostSimple('mfdlabs.okta.com'),
		});
		const state = Base64.stringify(MD5(`${nonceInit}\n${req}\n${HashingClient.GetSignedData(req)}--`));
		const url = BaseURL.ConstructServicePathFromHost('mfdlabs.okta.com', 'oauth2/v1/authorize', {
			client_id: DFString('OktaClientID'),
			response_type: 'code',
			redirect_uri: BaseURL.ConstructServicePathFromHostSimple('rcity.simulpong.com', 'authorization-code/callback', true),
			callback: '',
			nonce: nonce,
			state: state,
			scope: `openid profile email`,
		});
		return response.redirect(url, 302);
	},
};

interface OktaRequest {
	returnUrl: string;
}
