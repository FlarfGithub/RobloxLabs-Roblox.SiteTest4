import { DFString, DYNAMIC_FASTSTRINGVARIABLE } from '../../Web/Util/Roblox.Web.Util/Logging/FastLog';

// Set this to the default 0 version in case something breaks.
DYNAMIC_FASTSTRINGVARIABLE('WebVersion', '0.001.0.000001');

export class Versioning {
	public static GetVersion(): string {
		return DFString('WebVersion');
	}
}
