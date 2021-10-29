import { DFLog, FASTLOGS } from '../../../Web/Util/Roblox.Web.Util/Logging/FastLog';
import { Task } from '../../../../System/Threading/Task';
import { PartialDatabase } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Implementation/PartialDatabase';
import { PartialDatabaseConditionType } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Enumeration/PartialDatabaseConditionType';
import { ISequence } from './ISequence';

export class Sequence implements ISequence {
	Id: number;
	SequenceContext: string;
	SequenceName: string;
	SequenceAction: string;
	SequenceValue: number;
	SequenceCreated: Date;
	SequenceLastUpdated: Date;
	SequencePurgeDate: Date;
	IsNewSequence: boolean;

	private static isConnected: boolean;
	private static connectionAttemptRunning: boolean;
	private static dataBase: PartialDatabase;

	private static async connectIfNotConnected(): Task<void> {
		return new Promise<void>(async (resumeFunction) => {
			if (!this.connectionAttemptRunning) {
				this.connectionAttemptRunning = true;
				this.dataBase = new PartialDatabase('RobloxAnalytics', 'root', 'Io9/9DEF');
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

	public static async IncrementOrCreate(Context: string, Name: string, Action: string, Value: number) {
		if (!Value) Value = 1;
		if (!this.isConnected) await this.connectIfNotConnected();
		const [, , sequences] = this.dataBase.GetTable<ISequence>('Sequence', 'Id', true);

		/* TODO: Support multi conditional queries here. */

		const [, , result] = await sequences.SelectKeysWhere(['Id', 'SequenceValue'], {
			Key: 'SequenceName',
			Condition: PartialDatabaseConditionType.Equal,
			Value: Name,
		});

		const thisSequence = result.Rows[0];

		if (!thisSequence) {
			const [didInsert, errMessage] = await sequences.InsertValues([
				{ Key: 'SequenceName', Value: Name },
				{ Key: 'SequenceContext', Value: Context },
				{ Key: 'SequenceAction', Value: Action },
				{ Key: 'IsNewSequence', Value: 1 },
				{ Key: 'SequenceCreated', Value: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '') },
				{ Key: 'SequenceLastUpdated', Value: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '') },
				{
					Key: 'SequencePurgeDate',
					Value: new Date(new Date(Date.now()).getTime() + new Date(Date.now() + Date.now()).getTime())
						.toISOString()
						.replace('T', ' ')
						.replace('Z', ''),
				},
				{ Key: 'SequenceValue', Value: Value },
			]);

			if (!didInsert) {
				FASTLOGS(DFLog['Tasks'], '[DFLog::Tasks] Error Inserting Sequence %s', errMessage);
				throw errMessage;
			}

			return true;
		}
		let originalAmout = parseInt(<string>thisSequence.Data[1].Value);
		if (isNaN(originalAmout)) return true;
		originalAmout += Value;

		const [didUpdate, errMsg] = await sequences.UpdateKeys(
			[
				{ Key: 'SequenceValue', Value: originalAmout },
				{ Key: 'SequenceLastUpdated', Value: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '') },
			],
			{
				Key: 'SequenceName',
				Condition: PartialDatabaseConditionType.Equal,
				Value: Name,
			},
		);

		if (!didUpdate) {
			FASTLOGS(DFLog['Tasks'], '[DFLog::Tasks] Error Updating Counter %s', errMsg);
			throw errMsg;
		}
		return true;
	}
}
