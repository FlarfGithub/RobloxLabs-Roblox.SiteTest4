import { Task } from '../../../../System/Threading/Task';
import { PartialDatabaseConditionType } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Enumeration/PartialDatabaseConditionType';
import { PartialDatabase } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Implementation/PartialDatabase';
import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../../Web/Util/Roblox.Web.Util/Logging/FastLog';
import { InputValidator } from '../../../Web/Util/Roblox.Web.Util/Validators/InputValidator';
import { IClientVersion } from './IClientVersion';

DYNAMIC_LOGGROUP('Tasks');

export class ClientVersion implements IClientVersion {
	ID: number;
	ClientName: string;
	LatestMD5Hash: string;
	LastMD5Hash: string;
	LatestVersion: string;
	LastVersion: string;
	LatestSecurityVersion: string;
	LastSecurityVersion: string;
	LatestCDNVersion: string;
	LastCDNVersion: string;
	DateUploaded: string;

	private static isConnected: boolean;
	private static connectionAttemptRunning: boolean;
	private static dataBase: PartialDatabase;

	private static async connectIfNotConnected(): Task<void> {
		return new Promise<void>(async (resumeFunction) => {
			if (!this.connectionAttemptRunning) {
				this.connectionAttemptRunning = true;
				this.dataBase = new PartialDatabase('RobloxVersioning', 'root', 'Io9/9DEF');
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

	public static async GetByName(Name: string) {
		if (!this.isConnected) await this.connectIfNotConnected();
		const [, , ClientVersions] = this.dataBase.GetTable<IClientVersion>('ClientVersion', 'ID', true);
		const [, , result] = await ClientVersions.SelectAllWhere({
			Key: 'ClientName',
			Condition: PartialDatabaseConditionType.Equal,
			Value: Name,
		});

		const thisVersion = result.Rows[0];

		if (!thisVersion) return null;

		const version = new ClientVersion();
		version.ClientName = Name;
		version.ID = <number>(<unknown>thisVersion.Data[0].Value);
		version.LatestMD5Hash = <string>(<unknown>thisVersion.Data[2].Value);
		version.LastMD5Hash = <string>(<unknown>thisVersion.Data[3].Value);
		version.LatestVersion = <string>(<unknown>thisVersion.Data[2].Value);
		version.LastVersion = <string>(<unknown>thisVersion.Data[4].Value);
		version.LatestSecurityVersion = <string>(<unknown>thisVersion.Data[5].Value);
		version.LastSecurityVersion = <string>(<unknown>thisVersion.Data[6].Value);
		version.LatestCDNVersion = <string>(<unknown>thisVersion.Data[7].Value);
		version.LastCDNVersion = <string>(<unknown>thisVersion.Data[8].Value);
		version.LastCDNVersion = <string>(<unknown>thisVersion.Data[8].Value);
		version.DateUploaded = <string>(<unknown>thisVersion.Data[9].Value);

		return version;
	}

	public static async GetById(ID: number) {
		if (!this.isConnected) await this.connectIfNotConnected();
		const [, , ClientVersions] = this.dataBase.GetTable<IClientVersion>('ClientVersion', 'ID', true);
		const [, , result] = await ClientVersions.SelectKeyWhere('ClientName', {
			Key: 'ID',
			Condition: PartialDatabaseConditionType.Equal,
			Value: ID,
		});
		if (!result) return null;
		const thisVersion = result.Rows[0];

		if (!thisVersion) return null;

		return await this.GetByName(<string>thisVersion.Data[0].Value);
	}

	public static async GetAllLatestMD5HashesForUniqueClients() {
		const inputValidatorClient = new InputValidator();

		if (!this.isConnected) await this.connectIfNotConnected();
		const [, , ClientVersions] = this.dataBase.GetTable<IClientVersion>('ClientVersion', 'ID', true);
		const [success, errorMessage, result] = await ClientVersions.SelectKeys(['ClientName', 'LatestMD5Hash']);
		if (!success) throw errorMessage;
		if (!result) return [];
		if (result.Rows.length < 1) return [];

		const md5Hashes = [];
		const usedUpClients = [];

		result.Rows.forEach((version, idx) => {
			const clientName = <string>version.Data[0].Value;
			const latestClientMD5Hash = <string>version.Data[1].Value;
			if (inputValidatorClient.CheckIfValueIsIncludedInArray(clientName, usedUpClients)) return;
			usedUpClients.push(clientName);
			md5Hashes.push(latestClientMD5Hash);
		});

		return md5Hashes;
	}
}
