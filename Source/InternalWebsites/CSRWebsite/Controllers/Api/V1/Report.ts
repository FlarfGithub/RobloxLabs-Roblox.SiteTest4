import { Request, Response } from 'express';
import { KeyValueMapping } from '../../../../../Assemblies/Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';
import { ExploitReport } from '../../../../../Assemblies/Moderation/Roblox.Moderation/Entities/ExploitReport';
import { IExploitReport } from '../../../../../Assemblies/Moderation/Roblox.Moderation/Entities/IExploitReport';
import { Convert } from '../../../../../System/Convert';

export default {
	method: 'all',
	func: async (request: Request, response: Response) => {
		const e = await ExploitReport.GetReportsByIndexID(
			Convert.ToInt64(KeyValueMapping.FetchKeyFromObjectCaseInsensitive<long>(request.query, 'ID')),
		);

		const results = [];

		for (let i = 0; i < e.length; i++) {
			const obj: IExploitReport = { ...e[i], Created: undefined, Updated: undefined };
			results.push(KeyValueMapping.BringKeyMapKeysToUppercase(obj));
		}

		response.send({ error: 0, msg: 'Success', result: results });
	},
};
