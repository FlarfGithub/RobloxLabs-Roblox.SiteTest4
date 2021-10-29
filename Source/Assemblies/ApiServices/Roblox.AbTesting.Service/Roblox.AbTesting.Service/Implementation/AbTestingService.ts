import { IEnrollment } from '../../../../Platform/AbTesting/Roblox.Platform.AbTesting/IEnrollment';
import { ExperimentStatusEnum } from '../../../../Platform/AbTesting/Roblox.Platform.AbTesting/ExperimentStatusEnum';
import { SubjectTypeEnum } from '../../../../Platform/AbTesting/Roblox.Platform.AbTesting/SubjectTypeEnum';
import { Response } from 'express';

export class AbTestingService {
	public static HandleEnrollTo(enrollments: Array<IEnrollment>, response: Response) {
		const experimentStatuses = [];
		// Begin validations for enrollments
		enrollments.forEach((enrollment) => {
			// We are verifying if this enrollment is safe
			if (enrollment) {
				const experiment_status = {
					ExperimentName: enrollment.ExperimentName,
					SubjectTargetId: enrollment.SubjectTargetId,
					SubjectType: enrollment.SubjectType,
					Status: ExperimentStatusEnum.Inactive,
					Variation: null,
				};
				const experiment = {
					ExperimentName: experiment_status.ExperimentName,
					SubjectTargetId: experiment_status.SubjectTargetId,
					SubjectType: '',
					Status: '',
					Variation: experiment_status.Variation,
				};
				switch (experiment_status.Status) {
					case ExperimentStatusEnum.Enrolled:
						experiment.Status = 'Enrolled';
						break;
					case ExperimentStatusEnum.Inactive:
						experiment.Status = 'Inactive';
						break;
					case ExperimentStatusEnum.NoExperiment:
						experiment.Status = 'NoExperiment';
						break;
				}
				switch (experiment_status.SubjectType) {
					case SubjectTypeEnum.User:
						experiment.SubjectType = 'User';
						break;
					case SubjectTypeEnum.BrowserTracker:
						experiment.SubjectType = 'BrowserTracker';
						break;
				}
				experimentStatuses.push(experiment);
			}
		});
		return response.send({ data: experimentStatuses });
	}
}
