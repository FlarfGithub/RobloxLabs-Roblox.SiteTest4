declare namespace Roblox.Platform.Membership {
	class User implements Roblox.Platform.Membership.IUser {
		public Id: System.Int64;
		public Name: System.String;
		public DisplayName: System.String;
		public MembershipType: UserModelBuildersClubMembershipTypeEnum;
		public SecurityToken: System.String;
		public Description: System.String;
		public Password: IPassword;
		public Created: System.String;
		public IsBanned: System.Boolean;
		public Email: IEmail;
		public HasPasswordSet: System.Boolean;
		public AgeBracket: System.Int32;
		public Roles: System.String[];
		public RobuxBalance: System.Int64;
		public NotificationCount: System.Int32;
		public EmailNotificationsEnabled: System.Boolean;
		public CountryCode: System.String;
		public UserAbove13: System.Boolean;
		public ThumbnailUrl: System.String;
		public IsAnyBuildersClubMember: System.Boolean;
		public IsPremium: System.Boolean;
		public ChangeUsernameEnabled: System.Boolean;
		public IsAdmin: System.Boolean;

		/**
		 * Partial implementation, full implementation when DataBase is fully setup.
		 * @param {System.Int64} Id The userId.
		 * @returns {Roblox.Platform.Membership.IUser} Returns an IUser.
		 */
		public static GetByUserId(Id: System.Int64): Roblox.Platform.Membership.IUser;
	}
}
