export interface IGameLaunchResponseBase {
	jobId?: string;
	status: int;
	joinScriptUrl?: string;
	authenticationUrl?: string;
	authenticationTicket?: string;
	message?: string;
}
