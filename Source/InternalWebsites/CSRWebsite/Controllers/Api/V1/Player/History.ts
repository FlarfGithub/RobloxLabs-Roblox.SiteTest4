const e = { error: 0, msg: 'Success', result: [] };

import { Request, Response } from 'express';
import { GUID } from '../../../../../../Assemblies/Web/Util/Roblox.Web.Util/Generators/Guid';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		if (_request.query.id === '1') {
			const d = new Date();
			return response.send({
				error: 0,
				msg: 'Success',
				result: [
					{
						TIMESTAMP: `${d.toDateString().split('/').join('-')} ${d.toLocaleTimeString()}`,
						CLIENTIPV4: 2155117315,
						CLIENTUUID: GUID.GenerateUppercaseUUIDV4(),
						EXPLOITID: 1,
						EXPLOITFLAGS: 0,
						EXPLOITRULES: 0,
						EXPLOITPATH: 0,
					},
				],
			});
		}
		response.send(e);
	},
};
