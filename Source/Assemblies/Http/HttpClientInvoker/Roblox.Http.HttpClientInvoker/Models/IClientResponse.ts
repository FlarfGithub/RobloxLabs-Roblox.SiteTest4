import { HttpRequestMethodEnum } from '../../../Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { IHttpHeaders } from './JSON/IHttpHeaders';

export interface IClientResponse<TResponse = any> {
	/*String*/ Url: System.String;
	/*HttpRequestMethodEnum*/ Method: HttpRequestMethodEnum;
	/*Nullable*/ ResponsePayload: TResponse;
	/*IHttpHeaders*/ Headers: IHttpHeaders;
	/*Int32*/ StatusCode: System.Int32;
	/*String*/ StatusMessage: System.String;
}
