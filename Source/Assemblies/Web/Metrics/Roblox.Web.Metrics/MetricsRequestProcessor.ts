import { Response } from 'express';
import { MetricsType } from '../../../../ApiSites/Roblox.Metrics.Api/Enumeration/MetricsType';
import { MeasurementRequest } from '../../../../ApiSites/Roblox.Metrics.Api/MeasurementRequest';
import { Convert } from '../../../../System/Convert';
import { CountersClientV2 } from '../../../ApiClients/Roblox.Counters.Client/Implementation/CountersClient';
import { Task } from '../../../../System/Threading/Task';
import { ApiEmptyResponseModel } from '../../WebAPI/ApiEmptyResponseModel';
import { WebParsers } from '../../Parsers/Roblox.Web.Parsers/WebParsers';

export class MetricsRequestProcessor {
	public async SendMeasurement(request: MeasurementRequest, response?: Response<ApiEmptyResponseModel>) {
		const featureName = WebParsers.SanitizeData(request.featureName) || 'UnknownFeature';
		const measureName = WebParsers.SanitizeData(request.measureName) || 'UnknownMeasurement';
		const value = parseFloat(WebParsers.SanitizeData(request.value)) || 1;
		const excludeCountry = Convert.ToBoolean(request.excludeCountry, false);
		const metricsType = MetricsType[WebParsers.SanitizeData(request.metricsType)] || MetricsType.Sequence;

		const key = `${featureName}_${measureName}${!excludeCountry ? '_US' : ''}`;

		switch (metricsType) {
			case MetricsType.Counter:
				await CountersClientV2.IncrementCounter(key, value);
				break;
			case MetricsType.Sequence:
				await CountersClientV2.BatchAddToSequences([{ Key: key, Value: value }]);
				break;
		}

		return response ? response.send({}) : null;
	}

	public async BatchSendMeasurements(request: MeasurementRequest[]): Task<void> {
		return new Promise((resumeFunction, errorFunction) => {
			request.forEach(async (measurement, index) => {
				if (index === request.length + 1) {
					resumeFunction();
					return false;
				}
				try {
					await this.SendMeasurement(measurement, null);
				} catch (e) {
					errorFunction(e);
					return;
				}
				return;
			});
		});
	}
}
