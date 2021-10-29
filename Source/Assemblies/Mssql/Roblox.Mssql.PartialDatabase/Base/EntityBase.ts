import { Task } from '../../../../System/Threading/Task';
import { DFLog, FASTLOGS } from '../../../Web/Util/Roblox.Web.Util/Logging/FastLog';
import { PartialDatabase } from '../Implementation/PartialDatabase';

export class EntityBase {
	protected static isConnected: boolean;
	private static connectionAttemptRunning: boolean;
	protected static dataBase: PartialDatabase;

	protected static dataBaseName: string;

	protected static async connectIfNotConnected(): Task<void> {
		return new Promise<void>(async (resumeFunction) => {
			if (!this.connectionAttemptRunning) {
				this.connectionAttemptRunning = true;
				this.dataBase = new PartialDatabase(this.dataBaseName, 'root', 'Io9/9DEF');
				const [didConnect, errMessage] = await this.dataBase.Connect();
				if (!didConnect) {
					FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when connecting to DB: %s', errMessage);
					return false;
				}
				this.isConnected = didConnect;
				this.connectionAttemptRunning = false;
				resumeFunction();
			} else {
				setTimeout(async () => await this.connectIfNotConnected(), 50);
				return;
			}
		});
	}
}
