import { BaseURL } from '../../../Common/Roblox.Common/BaseUrl';
import { HttpClientInvoker } from '../../../Http/HttpClientInvoker/Roblox.Http.HttpClientInvoker/Implementation/HttpClientInvoker';
import { HttpRequestMethodEnum } from '../../../Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { Task } from '../../../../System/Threading/Task';
import { IUser } from '../../../Platform/Membership/Roblox.Platform.Membership/IUser';
import { IUniverse } from '../../../Platform/Universes/Roblox.Platform.Universes/IUniverse';

export class PointsClient {
	/**
	 * This method checks the status of the api service.
	 * @param isRequestSecure Request via a secure Url.
	 * @returns {Task<[Boolean, Number, String]>} Returns a task that describes the status.
	 */
	public static async CheckHealth(isRequestSecure: boolean = true): Task<[Boolean, Number, String, String]> {
		return new Promise<[Boolean, Number, String, String]>(async (resumeFunction) => {
			const CheckHealthUrl = BaseURL.ConstructServicePathFromSubDomainSimple('points.api', 'checkhealth', isRequestSecure);
			const Client = new HttpClientInvoker({
				Url: CheckHealthUrl,
				QueryString: {
					ApiKey: 'E3C6F569-496C-47F4-A76E-4F699DF453C4',
				},
				AdditionalHeaders: {},
				Payload: '',
				Method: HttpRequestMethodEnum.GET,
			});
			const [Success, Response] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.StatusCode, Response.StatusMessage, CheckHealthUrl]);
		});
	}

	/**
	 * Get the alltime points for the given IUser in the given IUniverse.
	 * @param {IUser} user The user to check.
	 * @param {IUniverse} universe The universe to check.
	 * @param {boolean} isRequestSecure Is the request secure
	 * @returns {Task<[Boolean, Number, String]>} Returns a Task the checks if the response was successful or not.
	 */
	public static async GetUserAllTimePoints(
		user: IUser,
		universe: IUniverse,
		isRequestSecure: boolean = true,
	): Task<[Boolean, Number, any, Error]> {
		return new Promise<[Boolean, Number, any, Error]>(async (resumeFunction) => {
			const Url = BaseURL.ConstructServicePathFromSubDomainSimple('points.api', 'v1/GetUserAllTimePoints', isRequestSecure);
			const Payload = {
				universe,
				user,
			};
			const Client = new HttpClientInvoker({
				Url: Url,
				QueryString: {
					ApiKey: 'E3C6F569-496C-47F4-A76E-4F699DF453C4',
				},
				AdditionalHeaders: { 'Content-Type': 'application/json' },
				Payload: JSON.stringify(Payload),
				Method: HttpRequestMethodEnum.POST,
				FailedMessage: `Error getting the alltime points for the user ${user.Id} in the universe ${universe.Id}`,
			});
			const [Success, Response, Error] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
		});
	}
}
