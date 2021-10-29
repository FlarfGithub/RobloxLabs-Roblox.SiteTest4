import { SubjectTypeEnum } from './SubjectTypeEnum';

export interface IEnrollment {
	/*String*/ ExperimentName: String;
	/*SubjectTypeEnum*/ SubjectType: SubjectTypeEnum;
	/*Int*/ SubjectTargetId: Number;
}
