import { NextFunction, Request, RequestHandler, Response } from 'express';
import { OriginMasterDescriptive } from '../../Util/Roblox.Web.Util/OriginMaster';

export const OnlyCORs = (host: string) =>
	((request: Request, response: Response, resumeFunction: NextFunction) => {
		const omd = new OriginMasterDescriptive(response, host);
		response.header(
			'Access-Control-Allow-Headers',
			'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN, Pragma, Cache-Control, expires',
		);
		response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		omd.ExecuteOriginCheck(request.headers['origin'], request.protocol);

		return resumeFunction();
	}) as RequestHandler;
