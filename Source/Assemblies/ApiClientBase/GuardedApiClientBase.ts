import { NextFunction } from 'express';
import { Guard } from './Guard';

export class GuardedApiClientBase {
	// private _host: string;
	// private _protocol: string;
	// private _errorFunction?: NextFunction;

	public constructor(hostName: string, protocol: string = 'https', errorFunction?: NextFunction) {
		Guard.ArgumentNotNull(hostName, 'hostName');
		Guard.ArgumentNotNull(protocol, 'protocol');

		// this._host = hostName;
		// this._protocol = protocol;
		// this._errorFunction = errorFunction;
	}
}
