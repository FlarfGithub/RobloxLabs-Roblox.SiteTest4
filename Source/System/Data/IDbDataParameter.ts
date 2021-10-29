import { IDataParameter } from './IDataParameter';

export interface IDbDataParameter extends IDataParameter {
	/* byte */ Precision: number /* get; set */;
	/* byte */ Scale: number /* get; set */;
	/* int */ Size: number /* get; set */;
}
