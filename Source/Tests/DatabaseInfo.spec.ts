import { dbInfo } from '../Assemblies/Common/Persistence/Roblox.Common.Persistence/dbInfo';
import { SqlParameter } from '../System/Data/SqlClient/SqlParameter';
import { SqlDbType } from '../System/Data/SqlDbType';

describe('Database info with connection string and procedure name', () => {
	it('Should contruct a dbInfo class with a connection string and procedure name', () => {
		const connStringAndProcedure: dbInfo = new dbInfo('TEST', 'TEST_PROCEDURE');

		expect(connStringAndProcedure.ConnectionString).toEqual('TEST');
		expect(connStringAndProcedure.StoredProcedure).toEqual('TEST_PROCEDURE');
	});
});

describe('Database info with connection string, procedure name and SQL Parameter', () => {
	it('Should contruct a dbInfo class with a connection string, procedure name and an SQL parameter', () => {
		const connStringProcedureAndSqlParameters: dbInfo = new dbInfo('TEST', 'TEST_PROCEDURE', [
			SqlParameter.FromValue('@TEST_PARAM', 'VALUE'),
		]);

		expect(connStringProcedureAndSqlParameters.ConnectionString).toEqual('TEST');
		expect(connStringProcedureAndSqlParameters.StoredProcedure).toEqual('TEST_PROCEDURE');
		expect(connStringProcedureAndSqlParameters.QueryParameters.length).toEqual(1);
		expect(connStringProcedureAndSqlParameters.QueryParameters[0].ParameterName).toEqual('@TEST_PARAM');
		expect(connStringProcedureAndSqlParameters.QueryParameters[0].Value).toEqual('VALUE');
	});
});

describe('Database info with connection string, procedure name, SQL Parameter and an output SQL parameter', () => {
	it('Should contruct a dbInfo class with a connection string, procedure name, SQL Parameter and an output SQL parameterr', () => {
		const connStringProcedureSqlParametersAndPrimaryKey: dbInfo = new dbInfo(
			'TEST',
			'TEST_PROCEDURE',
			SqlParameter.FromDbType('@ID', SqlDbType.BigInt),
			[SqlParameter.FromValue('@TEST_PARAM', 'VALUE')],
		);

		expect(connStringProcedureSqlParametersAndPrimaryKey.ConnectionString).toEqual('TEST');
		expect(connStringProcedureSqlParametersAndPrimaryKey.StoredProcedure).toEqual('TEST_PROCEDURE');
		expect(connStringProcedureSqlParametersAndPrimaryKey.QueryParameters.length).toEqual(1);
		expect(connStringProcedureSqlParametersAndPrimaryKey.OutputKey.ParameterName).toEqual('@ID');
		expect(connStringProcedureSqlParametersAndPrimaryKey.OutputKey.Value).toEqual(undefined);
		expect(connStringProcedureSqlParametersAndPrimaryKey.OutputKey.DbType).toEqual(SqlDbType.BigInt);
		expect(connStringProcedureSqlParametersAndPrimaryKey.QueryParameters[0].ParameterName).toEqual('@TEST_PARAM');
		expect(connStringProcedureSqlParametersAndPrimaryKey.QueryParameters[0].Value).toEqual('VALUE');
	});
});
