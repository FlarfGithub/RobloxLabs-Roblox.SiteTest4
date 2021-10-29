declare namespace Roblox.Platform.Membership {
	interface IUser {
		/*Int64*/ Id: System.Int64;
		/*String*/ Name: System.String;
		/*String*/ DisplayName: System.String;
		/*MembershipType*/ MembershipType: Roblox.Platform.Membership.MembershipType;
		/*String*/ SecurityToken: System.String;
		/*String*/ Description: System.String;
		/*IPassword*/ Password: Roblox.Platform.Credentials.IPassword;
		/*String*/ Created: System.String;
		/*Boolean*/ IsBanned: System.Boolean;
		/*IEmail*/ Email: Roblox.Platform.Credentials.IEmail;
		/*Boolean*/ HasPasswordSet: System.Boolean;
		/*Int32*/ AgeBracket: System.Int32;
		/*String[]*/ Roles: System.String[];
		/*Int64*/ RobuxBalance: System.Int64;
		/*Int32*/ NotificationCount: System.Int32;
		/*Boolean*/ EmailNotificationsEnabled: System.Boolean;
		/*String*/ CountryCode: System.String;
		/*Boolean*/ UserAbove13: System.Boolean;
		/*String*/ ThumbnailUrl: System.String;
		/*Boolean*/ IsAnyBuildersClubMember: System.Boolean;
		/*Boolean*/ IsPremium: System.Boolean;
		/*Boolean*/ ChangeUsernameEnabled: System.Boolean;
		/*Boolean*/ IsAdmin: System.Boolean;
	}
}
