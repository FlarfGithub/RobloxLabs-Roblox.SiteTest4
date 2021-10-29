import { ExperimentStatusEnum } from './ExperimentStatusEnum';
import { SubjectTypeEnum } from './SubjectTypeEnum';

export interface IEnrollmentResponse {
	/*SubjectTypeEnum*/ SubjectType: SubjectTypeEnum;
	/*Number*/ SubjectTargetId: Number;
	/*String*/ ExperimentName: String;
	/*ExperimentStatusEnum*/ Status: ExperimentStatusEnum;
	/*String*/ Variation: String;
}
