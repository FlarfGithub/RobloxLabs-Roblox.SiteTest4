import Hosts from '../Constants/Roblox.Common.Constants/Hosts'; /* we should really be using BaseURL to contruct all of these instead of hardcoding them */
import qs from 'querystring';

/**
 * TODO: In the future this should be similar to Roblox.Configuration (USE_CONFIG)
 */

export class BaseURL {
	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.GetBaseURL(System.Nullable`1)}
	 * Gets the UnsecureBaseURL from {Roblox.Common.Client.Urls}
	 * @param {bool?} preferApex Should this use the apexDomain over the baseUrl?
	 * @returns {string} Returns a string
	 */
	public static GetBaseURL(preferApex: bool = false): string {
		return 'http://' + BaseURL.GetBaseHost(preferApex);
	}

	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.GetSecureBaseURL(System.Nullable`1)}
	 * Gets the SecureBaseURL from {Roblox.Common.Client.Urls}
	 * @param {bool?} preferApex Should this use the apexDomain over the baseUrl?
	 * @returns {string} Returns a string
	 */
	public static GetSecureBaseURL(preferApex: bool = false): string {
		return 'https://' + BaseURL.GetBaseHost(preferApex);
	}

	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.ConstructServicePathFromSubDomainSimple(System.String,System.Nullable`1,System.Nullable`1)}
	 * Construct a simple service path.
	 * @param {string} subDomain The sub domain to use.
	 * @param {string?} servicePath A service path to be parsed.
	 * @param {bool?} secure Determines if the baseUri should start with https (true) or http (false/null)
	 * @returns {string} Returns string
	 */
	public static ConstructServicePathFromSubDomainSimple(subDomain: string, servicePath: string = '/', secure: boolean = true): string {
		return BaseURL.ConstructServicePathFromSubDomain(subDomain, servicePath, null, secure, false, true);
	}

	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.ConstructServicePathFromHostSimple(System.String,System.Nullable`1,System.Nullable`1)}
	 * Construct a simple service path. Using a hostName (Ideal for externalRequests)
	 * @param {string} hostName The host to construct with.
	 * @param {string?} servicePath A service path to be parsed.
	 * @param {bool?} secure Determines if the baseUri should start with https (true) or http (false/null)
	 * @returns {string} Returns string
	 */
	public static ConstructServicePathFromHostSimple(hostName: string, servicePath: string = '/', secure: boolean = true): string {
		return BaseURL.ConstructServicePathFromHost(hostName, servicePath, null, secure, true);
	}

	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.GetBaseHost(System.Nullable`1)}
	 * Get the BaseHost
	 * @param {bool?} preferApex Determines if the ApexDomain is used over the baseUrl.
	 * @returns {string} Returns string
	 */
	public static GetBaseHost(preferApex: bool = false): string {
		return preferApex ? Hosts.Apex : Hosts.WebHost;
	}

	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.ConstructServicePathFromSubDomain(System.String,System.Nullable`1,System.Nullable`1,System.Nullable`1,System.Nullable`1)}
	 * Construct a serviceUri from the given parameters.
	 * @param {string} subDomain Depending on if {preferApex} is set, this will construct the same url but with different times.
	 * @param {string} servicePath A service path to be parsed and trimmed of trailing slashes if {trimTrailingSlashes} is set.
	 * @param {Record<string, any>} queryParameters A {System.Collections.Generic.ICollection`2} of query parameters.
	 * @param {boolean} fetchSecureBaseUri Determines if the baseUri should start with https (true) or http (false/null)
	 * @param {boolean} preferApex Determines if the ApexDomain is used over the baseUrl.
	 * @param {boolean} trimTrailingSlashes Should it trim trailing slashes away from the servicePath
	 * @returns {string} Returns string
	 */
	public static ConstructServicePathFromSubDomain(
		subDomain: string,
		servicePath: string = '/',
		queryParameters: Record<string, any> = null,
		fetchSecureBaseUri: boolean = true,
		preferApex: boolean = false,
		trimTrailingSlashes: boolean = true,
	): string {
		const baseUrl = BaseURL.GetBaseHost(preferApex);
		let uri: string = '';

		let path = `${!servicePath.startsWith('/') ? `/${servicePath}` : servicePath}`;

		path = trimTrailingSlashes ? BaseURL.trim_trailing_slashes(path) : path;

		if (preferApex) {
			uri = `${subDomain}.${baseUrl}${path}`;
		} else {
			uri = `${BaseURL.replace_top_subdomain(baseUrl, subDomain)}${path}`;
		}

		if (queryParameters) {
			uri += `?${qs.stringify(queryParameters)}`;
		}

		return `${fetchSecureBaseUri ? 'https://' : 'http://'}${uri}`;
	}

	/**
	 * Comes from Roblox.Common.Client.BaseURL (BaseUrl.cs) {M:Roblox.Common.Client.BaseURL.ConstructServicePathFromHost(System.String,System.Nullable`1,System.Nullable`1,System.Nullable`1,System.Nullable`1)}
	 * Construct a serviceUri from the given parameters.
	 * @param {string} hostName The host to construct with.
	 * @param {string} servicePath A service path to be parsed and trimmed of trailing slashes if {trimTrailingSlashes} is set.
	 * @param {Record<string, any>} queryParameters A {System.Collections.Generic.ICollection`2} of query parameters.
	 * @param {boolean} fetchSecureBaseUri Determines if the baseUri should start with https (true) or http (false/null)
	 * @param {boolean} trimTrailingSlashes Should it trim trailing slashes away from the servicePath
	 * @returns {string} Returns string
	 */
	public static ConstructServicePathFromHost(
		hostName: string,
		servicePath: string = '/',
		queryParameters: Record<string, any> = null,
		fetchSecureBaseUri: boolean = true,
		trimTrailingSlashes: boolean = true,
	): string {
		const baseUrl = fetchSecureBaseUri
			? hostName.startsWith('http://')
				? hostName.replace('http://', 'https://')
				: `https://${hostName}`
			: hostName.startsWith('https://')
			? hostName.replace('https://', 'http://')
			: `http://${hostName}`;

		let path = `${!servicePath.startsWith('/') ? `/${servicePath}` : servicePath}`;
		path = trimTrailingSlashes ? BaseURL.trim_trailing_slashes(path) : path;

		let uri: string = `${baseUrl}${path}`;

		if (queryParameters) {
			uri += `?${qs.stringify(queryParameters)}`;
		}

		return uri;
	}

	/**
	 * @internal
	 */
	private static trim_trailing_slashes(str: string) {
		return str.replace(/\/$/, '');
	}

	/**
	 * @internal
	 */
	private static replace_top_subdomain(str: string, rep: string) {
		return str.replace(/www/, rep);
	}
}
