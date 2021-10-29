import { DataRowVersion } from './DataRowVersion';
import { DbType } from './DbType';
import { ParameterDirection } from './ParameterDirection';

export interface IDataParameter {
	/* DbType */ DbType: DbType /* get; set; */;
	/* ParameterDirection */ Direction: ParameterDirection /* get; set; */;
	/* Boolean */ IsNullable: boolean /* get; set; */;
	/* String */ ParameterName: string /* get; set; */;
	/* String */ SourceColumn: string /* get; set; */;
	/* DataRowVersion */ SourceVersion: DataRowVersion /* get; set; */;
	/* object */ Value: any /* get; set; */;
}
