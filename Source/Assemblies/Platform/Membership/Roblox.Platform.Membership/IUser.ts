import { IEmail } from '../../Credentials/Roblox.Platform.Credentials/IEmail';
import { IPassword } from '../../Credentials/Roblox.Platform.Credentials/IPassword';
import { UserModelBuildersClubMembershipTypeEnum } from './UserModelBuildersClubMembershipTypeEnum';
export interface IUser {
	/*Int64*/ Id: number;
	/*String*/ Name: string;
	/*String*/ DisplayName: string;
	/*UserModelBuildersClubMembershipTypeEnum*/ MembershipType: UserModelBuildersClubMembershipTypeEnum;
	/*String*/ SecurityToken: string;
	/*String*/ Description: string;
	/*IPassword*/ Password: IPassword;
	/*String*/ Created: string;
	/*Boolean*/ IsBanned: boolean;
	/*IEmail*/ Email: IEmail;
	/*Boolean*/ HasPasswordSet: boolean;
	/*Int32*/ AgeBracket: number;
	/*Array*/ Roles: Array<String>;
	/*Int64*/ RobuxBalance: number;
	/*Int32*/ NotificationCount: number;
	/*Boolean*/ EmailNotificationsEnabled: boolean;
	/*String*/ CountryCode: string;
	/*Boolean*/ UserAbove13: boolean;
	/*String*/ ThumbnailUrl: string;
	/*Boolean*/ IsAnyBuildersClubMember: boolean;
	/*Boolean*/ IsPremium: boolean;
	/*Boolean*/ ChangeUsernameEnabled: boolean;
	/*Boolean*/ IsAdmin: boolean;
}
