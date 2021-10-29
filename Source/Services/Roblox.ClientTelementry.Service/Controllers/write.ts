import { FASTLOGS, FLog, LOGGROUP } from '../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

LOGGROUP('ClientTelementry');

export default {
	method: 'all',
	func: async (_req, res) => {
		FASTLOGS(FLog['ClientTelementry'], '[FLog::ClientTelementry] %s', _req.body);
		return res.send();
	},
};
