import { Request, Response } from 'express';
import { ClientSettingsHandler } from '../../../../Assemblies/ApiServices/Roblox.ClientSettings.Handler/ClientSettingsHandler';
import { KeyValueMapping } from '../../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';
import { HttpRequestMethodEnum } from '../../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { ApiKeyValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';
import { MethodValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { Convert } from '../../../../System/Convert';
import { Page } from '../../Models/Page';
import { PageRequest } from '../../Models/PageRequest';

export default {
	method: 'all',
	func: (request: Request<null, Page, null, PageRequest>, response: Response<Page>) => {
		const apiKeyValidatorClient = new ApiKeyValidator(response, 'The service is unavailable.');
		const methodValidatorClient = new MethodValidator(response);
		const handler = new ClientSettingsHandler(response);

		if (methodValidatorClient.Validate(request.method, 'GET', true) === HttpRequestMethodEnum.UNKNOWN) return;
		if (
			!apiKeyValidatorClient.MultiValidate(
				KeyValueMapping.FetchKeyFromObjectCaseInsensitive<string>(request.query, 'ApiKey'),
				['D6925E56-BFB9-4908-AAA2-A5B1EC4B2D79', '76E5A40C-3AE1-4028-9F10-7C62520BD94F'],
				true,
			)
		)
			return;

		const pageIndex = Convert.ToInt32(KeyValueMapping.FetchKeyFromObjectCaseInsensitive<long>(request.query, 'PageIndex')) || 0;
		return handler.HandleGetPage({ PageIndex: pageIndex });
	},
};
