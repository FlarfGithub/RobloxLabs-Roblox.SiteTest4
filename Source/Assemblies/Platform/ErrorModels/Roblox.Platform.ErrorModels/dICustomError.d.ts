/// <reference path="../../../../System/System.d.ts" />

declare namespace Roblox.Platform.ErrorModels {
	interface ICustomError {
		/*Int32*/ public Code: Int32;
		/*String*/ public Message: String;
		/*String?*/ public UserFacingMessage?: String;
	}
}
