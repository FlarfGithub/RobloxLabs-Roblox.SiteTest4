import { BaseURL } from '../../../Common/Roblox.Common/BaseUrl';
import { HttpClientInvoker } from '../../../Http/HttpClientInvoker/Roblox.Http.HttpClientInvoker/Implementation/HttpClientInvoker';
import { HttpRequestMethodEnum } from '../../../Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { Task } from '../../../../System/Threading/Task';
import { Sequence } from '../../../../Services/Roblox.EphemeralCounters.Service/Sequence';

export class CountersClientV2 {
	public static async IncrementCounter(Name: string, Amount: number = 1): Task<[boolean, number, any, Error]> {
		return new Promise<[boolean, number, any, Error]>(async (resumeFunction) => {
			const Url = BaseURL.ConstructServicePathFromSubDomainSimple('ephemeralcounters.api', 'v1.1/Counters/Increment', true);
			const Payload = '{}';
			const Client = new HttpClientInvoker({
				Url: Url,
				QueryString: {
					ApiKey: '76E5A40C-3AE1-4028-9F10-7C62520BD94F',
					counterName: Name,
					amount: Amount,
				},
				AdditionalHeaders: { 'Content-Type': 'application/json' },
				Payload: Payload,
				Method: HttpRequestMethodEnum.POST,
				FailedMessage: `Error incrementing the counter ${Name}`,
			});
			const [Success, Response, Error] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
		});
	}

	public static async BatchIncrementCounters(request: { [key: string]: number }): Task<[boolean, number, any, Error]> {
		return new Promise<[boolean, number, any, Error]>(async (resumeFunction) => {
			const Url = BaseURL.ConstructServicePathFromSubDomainSimple('ephemeralcounters.api', 'v1.1/Counters/BatchIncrement', true);
			const Payload = JSON.stringify(request || {});
			const Client = new HttpClientInvoker({
				Url: Url,
				QueryString: {
					ApiKey: '76E5A40C-3AE1-4028-9F10-7C62520BD94F',
				},
				AdditionalHeaders: { 'Content-Type': 'application/json' },
				Payload: Payload,
				Method: HttpRequestMethodEnum.POST,
				FailedMessage: `Error incrementing the counters.`,
			});
			const [Success, Response, Error] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
		});
	}

	public static async BatchAddToSequences(request: Sequence[]): Task<[boolean, number, any, Error]> {
		return new Promise<[boolean, number, any, Error]>(async (resumeFunction) => {
			const Url = BaseURL.ConstructServicePathFromSubDomainSimple(
				'ephemeralcounters.api',
				'v1.0/SequenceStatistics/BatchAddToSequencesV2',
				true,
			);
			const Payload = JSON.stringify(request || []);
			const Client = new HttpClientInvoker({
				Url: Url,
				QueryString: {
					ApiKey: '76E5A40C-3AE1-4028-9F10-7C62520BD94F',
				},
				AdditionalHeaders: { 'Content-Type': 'application/json' },
				Payload: Payload,
				Method: HttpRequestMethodEnum.POST,
				FailedMessage: `Error incrementing the counters.`,
			});
			const [Success, Response, Error] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
		});
	}
}

export class CountersClient {
	public static async MultiIncrementCounters(counterNamesCsv: string[]): Task<[boolean, number, any, Error]> {
		return new Promise<[boolean, number, any, Error]>(async (resumeFunction) => {
			const request = counterNamesCsv.join(',');
			const Url = BaseURL.ConstructServicePathFromSubDomainSimple('ephemeralcounters.api', 'v1.0/MultiIncrement', true);
			const Payload = JSON.stringify({ counterNamesCsv: request });
			const Client = new HttpClientInvoker({
				Url: Url,
				QueryString: {
					ApiKey: '76E5A40C-3AE1-4028-9F10-7C62520BD94F',
				},
				AdditionalHeaders: { 'Content-Type': 'application/json' },
				Payload: Payload,
				Method: HttpRequestMethodEnum.POST,
				FailedMessage: `Error incrementing the counters.`,
			});
			const [Success, Response, Error] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
		});
	}
}
