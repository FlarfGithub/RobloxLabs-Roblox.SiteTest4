declare namespace Roblox.Web.AbTesting {
	class AbTestingRequestProcessor {
		public static TryEnrollToExperiment(
			experimentName: System.String,
			user: Roblox.Platform.Membership.IUser,
			browserTrackers: Roblox.Platform.Membership.IBrowserTracker[],
			requireSecureUri: Boolean,
		): System.Threading.Task;
	}
}
