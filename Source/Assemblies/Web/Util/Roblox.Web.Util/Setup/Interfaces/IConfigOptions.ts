import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { OutgoingMessage } from 'http';

export interface IConfigOptions<R extends OutgoingMessage = OutgoingMessage> {
	app: IApplicationBuilder;

	UseEndpoints?: boolean;
	UseRouting?: boolean;
	RoutingOpts?: {
		caseSensitive?: boolean;
		mergeParams?: boolean;
		strict?: boolean;
	};
	EndpointOpts?: {
		path: string;
		logSetups?: boolean;
		apiName?: string;
	};
	PagesOpts?: {
		path: string;
	};
	UsePages?: boolean;
	PageOpts?: {
		cacheControl?: boolean;
		dotfiles?: string;
		etag?: boolean;
		extensions?: string[] | false;
		fallthrough?: boolean;
		immutable?: boolean;
		index?: boolean | string | string[];
		lastModified?: boolean;
		maxAge?: number | string;
		redirect?: boolean;
		setHeaders?: (res: R, path: string, stat: unknown) => unknown;
	};
	errorpage?: boolean;
	fileListings?: boolean;
	useBetaControllerMapping?: boolean;
	doNotUseUrlEncoded?: boolean;
	doNotUseJSON?: boolean;
}
