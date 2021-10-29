import { IClientRequest } from '../Models/IClientRequest';
import { IClientResponse } from '../Models/IClientResponse';
import query from 'querystring';
import { HttpRequestMethodEnum } from '../../../Roblox.Http/Enumeration/HttpRequestMethodEnum';
import Http, { Method } from 'axios';
import SSL from 'https';
import { BaseURL } from '../../../../Common/Roblox.Common/BaseUrl';
import { Versioning } from '../../../../Common/Roblox.Common/Versioning';
import { HttpInvokerException } from '../Exceptions/HttpInvokerException';
import { hostname as GetCurrentMachineName, networkInterfaces as GetNetworkInterfaces } from 'os';

// TODO Have 2 variants of this, one with no callback and one with a callback?
export class HttpClientInvoker {
	private static LocalIP = HttpClientInvoker.GetLocalIP();
	private static MachineName = GetCurrentMachineName();
	private static GetLocalIP() {
		const nets = GetNetworkInterfaces();
		const results = Object.create(null);

		for (const name of Object.keys(nets)) {
			for (const net of nets[name]) {
				if (net.family === 'IPv4' && !net.internal) {
					if (!results[name]) {
						results[name] = [];
					}

					results[name].push(net.address);
				}
			}
		}
		return (results['eth0'] || results['WiFi'] || results['en0'])[0];
	}
	private request: IClientRequest;
	public constructor(request: IClientRequest) {
		this.request = request;
	}

	public UpdateConfiguration(request: IClientRequest) {
		if (this.request !== request) this.request = request;
	}

	public ClearConfiguration() {
		if (this.request !== null) this.request = null;
	}

	public async ClearCacheAsync(): Promise<void> {
		return new Promise((resumeFunction) => {
			return resumeFunction();
		});
	}

	/**
	 * We only ever want this to resume, never error, or the client will receive a call stack
	 * @returns {Promise<[Boolean, IClientResponse]>} Returns a task to be awaited.
	 */
	public async ExecuteAsync<TResponse = any>(): Promise<[boolean, IClientResponse<TResponse>, Error]> {
		return new Promise<[boolean, IClientResponse, Error]>((resumeFunction) => {
			if (!this.request)
				return resumeFunction([false, null, new TypeError("The request was null, please update it via 'UpdateConfiguration'.")]);

			const parsedQs = query.stringify(this.request.QueryString);
			const requestUrl = `${this.request.Url}?${parsedQs}`;
			let requestMethod: Method = 'GET';
			switch (this.request.Method) {
				case HttpRequestMethodEnum.GET:
					requestMethod = 'GET';
					break;
				case HttpRequestMethodEnum.POST:
					requestMethod = 'POST';
					break;
				case HttpRequestMethodEnum.DELETE:
					requestMethod = 'DELETE';
					break;
				case HttpRequestMethodEnum.HEAD:
					requestMethod = 'HEAD';
					break;
				case HttpRequestMethodEnum.OPTIONS:
					requestMethod = 'OPTIONS';
					break;
				case HttpRequestMethodEnum.PATCH:
					requestMethod = 'PATCH';
					break;
				case HttpRequestMethodEnum.PUT:
					requestMethod = 'PUT';
					break;
			}
			Http.request({
				url: requestUrl,
				method: requestMethod,
				httpsAgent: new SSL.Agent({ rejectUnauthorized: false }),
				headers: {
					...this.request.AdditionalHeaders,
					'User-Agent': `Roblox/ServiceClientInvokerTypescript ${
						process.version
					} (${BaseURL.GetSecureBaseURL()}+v${Versioning.GetVersion()}) (${HttpClientInvoker.MachineName}->${
						HttpClientInvoker.LocalIP
					})`,
					'Roblox-Machine-Id': HttpClientInvoker.MachineName,
					'Roblox-Machine-Ip': HttpClientInvoker.LocalIP,
				},
				data: this.request.Payload,
			})
				.then((response) => {
					resumeFunction([
						true,
						{
							Url: requestUrl,
							Method: this.request.Method,
							ResponsePayload: response.data,
							Headers: response.headers,
							StatusCode: response.status,
							StatusMessage: response.statusText,
						},
						null,
					]);
				})
				.catch((err) => {
					if (err.response) {
						return resumeFunction([
							false,
							{
								Url: requestUrl,
								Method: this.request.Method,
								ResponsePayload: err.response.data,
								Headers: err.response.headers,
								StatusCode: err.response.status,
								StatusMessage: err.response.statusText,
							},
							new HttpInvokerException(
								this.request.Url,
								<string>this.request.FailedMessage || 'Error',
								err.response.status,
								err.response.headers['roblox-machine-id'] || 'None',
								'None',
							).fetch(),
						]);
					}
					return resumeFunction([
						false,
						{
							Url: requestUrl,
							Method: this.request.Method,
							ResponsePayload: null,
							Headers: null,
							StatusCode: 0,
							StatusMessage: 'ConnectionError',
						},
						new HttpInvokerException(
							this.request.Url,
							<string>this.request.FailedMessage || 'Error',
							0,
							'None',
							'None',
						).fetch(),
					]);
				});
		});
	}
}
