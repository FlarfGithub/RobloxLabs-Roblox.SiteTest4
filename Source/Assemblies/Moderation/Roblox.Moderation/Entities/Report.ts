import { EntityBase } from '../../../Mssql/Roblox.Mssql.PartialDatabase/Base/EntityBase';
import { FASTLOGS, FLog } from '../../../Web/Util/Roblox.Web.Util/Logging/FastLog';
import { IReport } from './IReport';

export class Report extends EntityBase implements IReport {
	CreateTime: string;
	CreatorID: number;
	ID: number;
	RStatus: number;
	StatBegin: string;
	StatCount: number;
	StatEnd: string;
	UpdateTime: string;
	Created: string;
	Updated: string;
	protected static dataBaseName = 'RobloxModeration';

	public static async GetReports() {
		if (!this.isConnected) await this.connectIfNotConnected();
		const [, , reports] = this.dataBase.GetTable<IReport>('Report', 'Id', true);

		const [success, errMsg, data] = await reports.SelectAll();

		if (!success) {
			FASTLOGS(FLog['Moderation'], `[FLog::Moderation] Failed to fetch report because: %s`, errMsg);
		}

		const reportData: IReport[] = [];

		for (let i = 0; i < data.Rows.length; i++) {
			const report = new Report();

			report.ID = <long>(<unknown>data.Rows[i].Data[0].Value);
			report.CreateTime = <string>(<unknown>data.Rows[i].Data[1].Value);
			report.Created = <string>(<unknown>data.Rows[i].Data[2].Value);
			report.CreatorID = <long>(<unknown>data.Rows[i].Data[3].Value);
			report.RStatus = <int>(<unknown>data.Rows[i].Data[4].Value);
			report.StatBegin = <string>(<unknown>data.Rows[i].Data[5].Value);
			report.StatCount = <int>(<unknown>data.Rows[i].Data[6].Value);
			report.StatEnd = <string>(<unknown>data.Rows[i].Data[7].Value);
			report.UpdateTime = <string>(<unknown>data.Rows[i].Data[8].Value);
			report.Updated = <string>(<unknown>data.Rows[i].Data[9].Value);

			reportData.push(report);
		}

		return reportData;
	}
}
