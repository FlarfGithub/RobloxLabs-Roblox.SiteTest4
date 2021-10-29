import { IAccountRoleSet } from './IAccountRoleSet';

export interface IAccount {
	ID: int;
	Created: DateTime;
	Updated: DateTime;
	EmailAddress: string;
	PhoneNumber: string;
	AccountRoleSets: IAccountRoleSet[];
}
