import { AbTestingClient } from '../../../ApiClients/Roblox.AbTesting.Client/Roblox.AbTesting.Client/Implementation/AbTestingClient';
import { Task } from '../../../../System/Threading/Task';
import { IEnrollment } from '../../../Platform/AbTesting/Roblox.Platform.AbTesting/IEnrollment';
import { IExperiment } from '../../../Platform/AbTesting/Roblox.Platform.AbTesting/IExperiment';
import { SubjectTypeEnum } from '../../../Platform/AbTesting/Roblox.Platform.AbTesting/SubjectTypeEnum';
import { IBrowserTracker } from '../../../Platform/Membership/Roblox.Platform.Membership/IBrowserTracker';
import { IUser } from '../../../Platform/Membership/Roblox.Platform.Membership/IUser';

export namespace AbTestingRequestProcessor {
	/**
	 * This function attempts to enroll the user, browser tracker or both to the current experimentName.
	 * @param {String} experimentName The experiment to try enroll the current IUser or IBrowserTracker to.
	 * @param {IUser} user The IUser instance to enroll, if none is present, i.e. it's Null, it will try and use the IBrowserTracker instance.
	 * @param {IBrowserTracker} browserTracker The IBrowserTracker instance to enroll, if none is present, i.e. it's Null, it will try and use the IUser instance.
	 * @param {Boolean} requireSecureUri Should the ApiClient request with a HTTPS Uri
	 * @returns {Task<[Boolean, String]>} Returns a Task to be awaited for response.
	 */
	export async function TryEnrollToExperiment(
		experimentName: String,
		user: IUser,
		browserTracker: IBrowserTracker,
		requireSecureUri: Boolean,
	): Task<[Boolean, String]> {
		return new Promise<[Boolean, String]>(async (resumeFunction) => {
			const enrollments: Array<IEnrollment> = [];
			if (user) {
				enrollments.push({
					ExperimentName: experimentName,
					SubjectTargetId: user.Id,
					SubjectType: SubjectTypeEnum.User,
				});
			}
			if (browserTracker) {
				enrollments.push({
					ExperimentName: experimentName,
					SubjectTargetId: browserTracker.BrowserTrackerId,
					SubjectType: SubjectTypeEnum.BrowserTracker,
				});
			}
			const [WasRequestSuccessful, ResponseMessage] = await AbTestingClient.TryEnrollToExperiments(
				enrollments,
				user.SecurityToken,
				requireSecureUri,
			);
			resumeFunction([WasRequestSuccessful, ResponseMessage]);
		});
	}

	/**
	 * This function attempts to enroll the user, browser tracker or both to listed experiments.
	 * @param {Array<String>} experiments The experiments to try enroll the current IUser or IBrowserTracker to.
	 * @param {IUser} user The IUser instance to enroll, if none is present, i.e. it's Null, it will try and use the IBrowserTracker instance.
	 * @param {IBrowserTracker} browserTracker The IBrowserTracker instance to enroll, if none is present, i.e. it's Null, it will try and use the IUser instance.
	 * @param {Boolean} requireSecureUri Should the ApiClient request with a HTTPS Uri
	 * @returns {Task<[Boolean, String]>} Returns a Task to be awaited for response.
	 */
	export async function TryEnrollToExperiments(
		experiments: Array<IExperiment>,
		user: IUser,
		browserTracker: IBrowserTracker,
		requireSecureUri: Boolean,
	): Task<[Boolean, String, Number | null]> {
		return new Promise<[Boolean, String, Number | null]>(async (resumeFunction) => {
			const enrollments: Array<IEnrollment> = [];
			experiments.forEach((experiment) => {
				if (user && experiment.Type === SubjectTypeEnum.User) {
					enrollments.push({
						ExperimentName: experiment.Name,
						SubjectTargetId: user.Id,
						SubjectType: SubjectTypeEnum.User,
					});
				}
				if (browserTracker && experiment.Type === SubjectTypeEnum.BrowserTracker) {
					enrollments.push({
						ExperimentName: experiment.Name,
						SubjectTargetId: browserTracker.BrowserTrackerId,
						SubjectType: SubjectTypeEnum.BrowserTracker,
					});
				}
			});

			const [WasRequestSuccessful, ResponseMessage, code] = await AbTestingClient.TryEnrollToExperiments(
				enrollments,
				user ? user.SecurityToken : null,
				requireSecureUri,
			);
			resumeFunction([WasRequestSuccessful, ResponseMessage, code]);
		});
	}
}
