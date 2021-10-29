import { Request, Response } from 'express';
import { CachePolicy } from '../../../../Assemblies/Http/HttpClientInvoker/Roblox.Http.HttpClientInvoker/Models/IClientRequest';
import { AvatarRequestProcessor } from '../../../../Assemblies/Web/Avatars/Roblox.Web.Avatars/AvatarRequestProcessor';
import { AvatarAccoutrementsRequest } from '../../Models/Game/IAvatarAccoutrementsRequest';

export default {
	method: 'all',
	func: async (request: Request<null, string, null, AvatarAccoutrementsRequest>, response: Response<string>) => {
		const cachedRequestProcessor = new AvatarRequestProcessor(CachePolicy.StaleAfterOneMinute, response);

		var [UserID, UserName, allowSSL] = cachedRequestProcessor.ExtractDataFromQueryStringForAvatarAccoutrementsRequest(request);

		await cachedRequestProcessor.GetAvatarAccoutrementsAsync(UserID, UserName, allowSSL);
	},
};
