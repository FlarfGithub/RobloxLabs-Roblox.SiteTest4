/// <reference path="../../../../System/System.d.ts" />

declare namespace Roblox.Platform.ErrorModels {
	class CustomError {
		/*Int32*/ public code: Int32;
		/*String*/ public message: String;
		/*String?*/ public userFacingMessage?: String;
	}
}
