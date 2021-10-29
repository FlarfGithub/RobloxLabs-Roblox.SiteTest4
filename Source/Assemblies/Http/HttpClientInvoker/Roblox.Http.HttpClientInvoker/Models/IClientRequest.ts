import { HttpRequestMethodEnum } from '../../../Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { IHttpHeaders } from './JSON/IHttpHeaders';
import { IHttpQueries } from './JSON/IHttpQueries';

export interface IClientRequest {
	/*String*/ Url?: string;
	/*HttpRequestMethodEnum*/ Method?: HttpRequestMethodEnum;
	/*String*/ Payload?: string;
	/*IHttpHeaders*/ AdditionalHeaders?: IHttpHeaders;
	/*IHttpQueries*/ QueryString?: IHttpQueries;
	/*String*/ FailedMessage?: string;
	/*CachePoclicy*/ CachePolicy?: CachePolicy;
	/*Boolean*/ CheckResponseDataForOKStatus?: bool;
}
export enum CachePolicy {
	DoNotCache,
	StaleAfterFiveSeconds,
	StaleAfterTenSeconds,
	SateAfterThirtySeconds,
	StaleAfterOneMinute,
	StaleAfterTwoMinutes,
	StaleAfterFiveMinutes,
	StaleAfterTenMinutes,
	StaleAfterFifteenMinutes,
	StateAfterThirtyMinutes,
	StaleAfterOneHour,
}
