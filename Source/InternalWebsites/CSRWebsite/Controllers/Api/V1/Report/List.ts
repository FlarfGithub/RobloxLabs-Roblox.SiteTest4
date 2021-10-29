import { Request, Response } from 'express';
import { KeyValueMapping } from '../../../../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';
import { IReport } from '../../../../../../Assemblies/Moderation/Roblox.Moderation/Entities/IReport';
import { Report } from '../../../../../../Assemblies/Moderation/Roblox.Moderation/Entities/Report';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const e = await Report.GetReports();

		const results = [];

		for (let i = 0; i < e.length; i++) {
			const obj: IReport = { ...e[i], Created: undefined, Updated: undefined };
			results.push(KeyValueMapping.BringKeyMapKeysToUppercase(obj));
		}

		response.send({ error: 0, msg: 'Success', result: results });
	},
};
