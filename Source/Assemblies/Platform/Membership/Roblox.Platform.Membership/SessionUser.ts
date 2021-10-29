import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../../Web/Util/Roblox.Web.Util/Logging/FastLog';
import { Task } from '../../../../System/Threading/Task';
import { PartialDatabase } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Implementation/PartialDatabase';
import { PartialDatabaseConditionType } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Enumeration/PartialDatabaseConditionType';
import { ISessionUser } from './ISessionUser';

DYNAMIC_LOGGROUP('Tasks');

// TODO: Add GetOrCreateById()
export class SessionUser implements ISessionUser {
	public Id: System.Int64; // PK AI
	public IpAddress: System.String; // Implement an IpAdress interface here.
	public LanguageCode: System.String;
	public LanguageName: System.String;

	private static isConnected: boolean;
	private static connectionAttemptRunning: boolean;
	private static db: PartialDatabase;

	private static async connectIfNotConnected(): Task<void> {
		return new Promise<void>(async (resumeFunction) => {
			if (!this.connectionAttemptRunning) {
				this.db = new PartialDatabase('RobloxMembership', 'root', 'Io9/9DEF');
				this.connectionAttemptRunning = true;
				const [didConnect, errMessage] = await this.db.Connect();
				if (!didConnect) {
					FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when connecting to DB: %s', errMessage);
					return false;
				}
				this.isConnected = didConnect;
				this.connectionAttemptRunning = false;
				resumeFunction();
			} else {
				do {} while (this.connectionAttemptRunning);
				resumeFunction();
			}
		});
	}

	/**
	 * Simple implementation to fetch or, create and fetch session user from the DB, expect this to cache instead.
	 * @param {System.String} IpAddress The IP address to query by.
	 * @returns {ISessionUser} Returns null if an error occured, or an {ISessionUser} if not.
	 */
	public static async GetOrCreateByIpAddress(IpAddress: string): Task<ISessionUser> {
		if (!this.isConnected) await this.connectIfNotConnected();

		const [, , sessionUsers] = this.db.GetTable<ISessionUser>('SessionUser', 'Id', true);
		const [success, message, result] = await sessionUsers.SelectAllWhere({
			Key: 'IpAddress',
			Condition: PartialDatabaseConditionType.Equal,
			Value: IpAddress,
		});
		if (!success) {
			FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] Error when fetching user: %s', message);
			return null;
		}
		const thisSession = result.Rows[0];
		const session = new SessionUser();
		if (!thisSession) {
			sessionUsers.InsertValues([
				{
					Key: 'IpAddress',
					Value: IpAddress,
				},
				{ Key: 'LanguageCode', Value: 'en_us' },
				{ Key: 'LanguageName', Value: 'English' },
			]);
			session.Id = null; // Make it null because we don't know what the Id will be.
			session.IpAddress = IpAddress;
			session.LanguageCode = 'en_us';
			session.LanguageName = 'English';
			return session;
		}
		session.Id = <number>(<unknown>thisSession.Data[0].Value);
		session.IpAddress = IpAddress;
		session.LanguageCode = <string>thisSession.Data[2].Value;
		session.LanguageName = <string>thisSession.Data[3].Value;
		return session;
	}
}
