import { Request, Response } from 'express';
import { PointsHandler } from '../../../../Assemblies/ApiServices/Roblox.Points.Handler/Implementation/PointsHandler';
import { IUser } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/IUser';
import { IUniverse } from '../../../../Assemblies/Platform/Universes/Roblox.Platform.Universes/IUniverse';
import { __baseDirName } from '../../../../Assemblies/Common/Constants/Roblox.Common.Constants/Directories';
import { DefaultAsp404 } from '../../../../Assemblies/Web/Errors/Roblox.Web.Errors/aspError404';
import { ApiKeyValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ApiKeyValidator';
import { ContentTypeValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ContentTypeValidator';
import { MethodValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { HttpRequestMethodEnum } from '../../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { ProtocolValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ProtocolValidator';
import { KeyValueMapping } from '../../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const requestSchemeHandler = new ProtocolValidator(null);
		const methodValidatorHandler = new MethodValidator(response);
		const contentTypeValidatorHandler = new ContentTypeValidator(response, request.body !== null);
		const apiKeyValidatorHandler = new ApiKeyValidator(response, '');
		const handler = new PointsHandler(response);

		if (!requestSchemeHandler.Validate(request.protocol, 'HTTPS')) return DefaultAsp404(request, response);
		if (methodValidatorHandler.Validate(request.method, 'POST', true) === HttpRequestMethodEnum.UNKNOWN) return;
		if (!contentTypeValidatorHandler.Validate(request.headers['content-type'], null, true)) return;
		if (
			!apiKeyValidatorHandler.Validate(
				KeyValueMapping.FetchKeyFromObjectCaseInsensitive<string>(request.query, 'ApiKey'),
				'E3C6F569-496C-47F4-A76E-4F699DF453C4',
				true,
			)
		)
			return;

		return handler.HandleGetAllTimePoints(<IUser>request.body.user, <IUniverse>request.body.universe);
	},
};
