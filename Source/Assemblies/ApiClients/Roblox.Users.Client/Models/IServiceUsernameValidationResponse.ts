import { UsernameValidationContext } from '../../../../ApiSites/Roblox.Auth.Api/Enumerations/UsernameValidationContext';
import { UsernameValidationStatus } from '../../../../ApiSites/Roblox.Auth.Api/Enumerations/UsernameValidationStatus';
import { IUser } from '../../../Platform/Membership/Roblox.Platform.Membership/IUser';

export interface IServiceUsernameValidationResponse {
	IUser: IUser;
	Username: System.String;
	Status: UsernameValidationStatus;
	Context: UsernameValidationContext;
	IsRCC: System.Boolean;
	Birthdate: System.String;
	InternalMessage: System.String;
}
