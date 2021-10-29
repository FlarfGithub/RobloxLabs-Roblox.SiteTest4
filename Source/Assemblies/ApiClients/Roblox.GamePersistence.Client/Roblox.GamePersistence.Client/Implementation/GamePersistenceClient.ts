import { Task } from '../../../../../System/Threading/Task';
import { BaseURL } from '../../../../Common/Roblox.Common/BaseUrl';
import { HttpClientInvoker } from '../../../../Http/HttpClientInvoker/Roblox.Http.HttpClientInvoker/Implementation/HttpClientInvoker';
import { HttpRequestMethodEnum } from '../../../../Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
export class GamePersistenceClient {
	/**
	 * Try enroll the current IEntrollments.
	 * @param {Number} universeId The universeId to fetch from.
	 * @param {String} UserAuthToken The Authentication Token for the user being validated.
	 * @param {Boolean} requireSecureUri Should the ApiClient request with a HTTPS Uri
	 * @returns {Task<[Boolean, String, Number]>} Returns a Task to be awaited for response.
	 */
	public static async TryFetchTheDataStoresForThisUniverse(
		universeId: Number,
		UserAuthToken: String,
		requireSecureUri: Boolean,
	): Task<[Boolean, String, Number | null]> {
		return new Promise<[Boolean, String, Number | null]>(async (resumeFunction) => {
			const GamePersistenceGetTheStoresForThisUniverseUrl = `${(requireSecureUri
				? BaseURL.GetSecureBaseURL()
				: BaseURL.GetBaseURL()
			).replace(/www/, 'gamepersistence.api')}/v4/datastores/fetch-this-universe`;
			const postData = { universeId };
			const Client = new HttpClientInvoker({
				Url: GamePersistenceGetTheStoresForThisUniverseUrl,
				QueryString: {
					ApiKey: '223101C8-6699-4F88-B1BF-E5381531ED27',
					'Content-Type': 'application/json',
				},
				AdditionalHeaders: { Cookie: `.ROBLOSECURITY=${UserAuthToken || ''}` },
				Payload: JSON.stringify(postData),
				Method: HttpRequestMethodEnum.POST,
			});
			const [Success, Response] = await Client.ExecuteAsync();
			return resumeFunction([Success, Response.ResponsePayload, Response.StatusCode]);
		});
	}
}
