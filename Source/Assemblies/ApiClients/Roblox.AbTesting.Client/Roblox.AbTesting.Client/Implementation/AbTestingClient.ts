import { Task } from '../../../../../System/Threading/Task';
import { IEnrollment } from '../../../../Platform/AbTesting/Roblox.Platform.AbTesting/IEnrollment';
import Http from 'axios';
import { BaseURL } from '../../../../Common/Roblox.Common/BaseUrl';
import { DFLog, DYNAMIC_LOGGROUP, FASTLOGS } from '../../../../Web/Util/Roblox.Web.Util/Logging/FastLog';
import https from 'https';

DYNAMIC_LOGGROUP('Tasks');

export class AbTestingClient {
	/**
	 * Try enroll the current IEntrollments.
	 * @param {Array<IEnrollment>} enrollments The enrollments to send to abtesting.api
	 * @param {String} UserAuthToken The Authentication Token for the user being validated.
	 * @param {Boolean} requireSecureUri Should the ApiClient request with a HTTPS Uri
	 * @returns {Task<[Boolean, String]>} Returns a Task to be awaited for response.
	 */
	public static async TryEnrollToExperiments(
		enrollments: Array<IEnrollment>,
		UserAuthToken: String,
		requireSecureUri: Boolean,
	): Task<[Boolean, String, Number | null]> {
		return new Promise<[Boolean, String, Number | null]>((resumeFunction) => {
			const AbTestingApiEnrollToExperimentsUrl = `${(requireSecureUri ? BaseURL.GetSecureBaseURL() : BaseURL.GetBaseURL()).replace(
				/www/,
				'abtesting.api',
			)}/v1/experiments/enroll-to?ApiKey=B030971C-2A32-41B3-B808-18BCBE3B3483`;
			const postData = { data: enrollments };
			Http.post(AbTestingApiEnrollToExperimentsUrl, postData, {
				headers: {
					Cookie: `.ROBLOSECURITY=${UserAuthToken}`,
				},
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
			})
				.then((Response) => {
					resumeFunction([true, JSON.stringify(Response.data), Response.status]);
				})
				.catch((Err) => {
					if (!Err.response) {
						const message = new Error(`Error enrolling to experiments for the user: ${
							UserAuthToken || 'NoUser'
						}. Roblox.Http.ConnectionException: An error has occurred with your request.
	Status code: None (None)
	Url: ${(requireSecureUri ? BaseURL.GetSecureBaseURL() : BaseURL.GetBaseURL()).replace(/www/, 'abtesting.api')}/v1/experiments/enrollto
	Response Machine Id: RA-WEB114
	Error code: ${Err.message}`).stack;
						FASTLOGS(DFLog('Tasks'), '[DFLog::Tasks] %s', message);
						return resumeFunction([false, message, 500]);
					}
					resumeFunction([false, Err.response.statusText, Err.response.status]);
				});
		});
	}
}
