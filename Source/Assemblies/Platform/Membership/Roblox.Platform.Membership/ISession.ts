import { LocationEnum } from './LocationEnum';

export interface ISession {
	/*Int64*/ Id: System.Int64 /* PK AI */;
	/*Int64*/ UserId: System.Int64 /* FK */;
	/*String*/ SessionToken: System.String;
	/*LocationEnum*/ Location: LocationEnum;
	/*String*/ UserAgent: System.String;
	/*DateTime<String>*/ Created: System.DateTime;
}
