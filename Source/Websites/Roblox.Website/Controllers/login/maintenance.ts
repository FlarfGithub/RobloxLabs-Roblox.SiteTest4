import { NextFunction, Request, Response } from 'express';
import Hosts from '../../../../Assemblies/Common/Constants/Roblox.Common.Constants/Hosts';
import { SessionUser } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/SessionUser';
import { User } from '../../../../Assemblies/Platform/Membership/Roblox.Platform.Membership/User';
import { DFFlag, DYNAMIC_FASTFLAG, DYNAMIC_FASTFLAGVARIABLE } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';
import { IMetaTagListViewModel } from '../../ViewModels/MetaTagListViewModel';

DYNAMIC_FASTFLAGVARIABLE('WWWIndexPageControllerEnabled', false);
DYNAMIC_FASTFLAG('DisplayNamesEnabled');
DYNAMIC_FASTFLAGVARIABLE('IsSignupFormDarkThemeEnabled', true);

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		const securityToken = request.cookies['.ROBLOSECURITY'];
		const IUser = await User.GetByCookie(securityToken);

		if (IUser !== null) {
			return response.redirect('/home'); // NOTICE: Do not do this in the middleware, it creates awful captures.
		}
		if (securityToken !== undefined) response.clearCookie('.ROBLOSECURITY', { domain: 'sitetest4.robloxlabs.com' }); // We need them to clear that cookie, this will not be needed when it checks by user, unlike just checking for it's presence...
		/* Session User fetch, use SessionUser.GetOrCreate(IP) -- This will get the user by IP, or will create one with the given IP, IF they have a browser tracker, then try fetch that. */
		const ISessionUser = await SessionUser.GetOrCreateByIpAddress(request.ip);
		if (ISessionUser === null) {
			// ACK! Something went wrong, redirect to the 500 page.
			return response.redirect('/request-error?code=500'); // Add Id here when it is implemented.
		}
		return response.render('Maintenance', {
			ISessionUser: { ...ISessionUser, Device: {} },
			IUser,
			IUserAuthenticated: IUser !== null,
			Default: {
				Experiments: {
					DisplayNamesEnabled: DFFlag('DisplayNamesEnabled'),
					IsSignupFormDarkThemeEnabled: DFFlag('IsSignupFormDarkThemeEnabled'),
				},
			},
			PageMetadata: {
				MachineID: 'WEB1447',
				InternalPageName: '',
			},
			MetaTagListViewModel: <IMetaTagListViewModel>{
				FacebookMetaTags: null,
				TwitterMetaTags: null,
				StructuredDataTags: {
					StructuredDataContext: 'http://schema.org',
					StructuredDataType: 'Organization',
					StructuredDataName: 'Roblox',
					RobloxUrl: 'https://www.roblox.com/',
					RobloxLogoUrl: 'https://images.rbxcdn.com/c69b74f49e785df33b732273fad9dbe0.png',
					RobloxFacebookUrl: 'https://www.facebook.com/ROBLOX/',
					RobloxTwitterUrl: 'https://twitter.com/roblox',
					RobloxLinkedInUrl: 'https://www.linkedin.com/company/147977',
					RobloxInstagramUrl: 'https://www.instagram.com/roblox/',
					RobloxYouTubeUrl: 'https://www.youtube.com/user/roblox',
					RobloxGooglePlusUrl: 'https://plus.google.com/+roblox',
					RobloxTwitchTvUrl: 'https://www.twitch.tv/roblox',
					Title: 'Site Offline - Roblox',
					Description: null,
					Images: null,
					ImageWidth: null,
					ImageHeight: null,
				},
				Description: 'Roblox is a global platform that brings people together through play.',
				Keywords: 'free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine',
				NoIndexNoFollow: false,
				NoIndex: false,
				NoFollow: false,
				IncludeReferrerOriginTag: false,
				GoogleSiteVerificationTag: null,
			},
			LinkData: [
				{ Type: 'icon', HREF: `${request.protocol}://images.rbxcdn.com/23421382939a9f4ae8bbe60dbe2a3e7e.ico.gzip` },
				{
					Type: 'stylesheet',
					Bundle: { Name: 'StyleGuide', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/e5781cb0d5d669eb50e8739813253ceb7224cfc55a3e87478d56847ab4a6507e.css`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'Thumbnails', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/dec2100f52214e6eb0c8f49a097a8a84797ed33125f4a12ad7b48ca7a9dcb341.css`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'VerificationUpsell', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/f8cdef9411c715490d44f28636c1827d6bb75968d9fc2498b9f8be7769aa1c61.css`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'Navigation', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/50022bff26efaae4887eb23d4337cdcf78eb4c7e95fde2bd0b0dd962572d2243.css`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'Footer', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/0679bc187827027ec36129a841a744897ab34d9e100a48f32f3191e90d5047d6.css`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'ConfigureWebApps', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/d3eaae41fcf2a436ccd083ee82f13474327ebaa97fc544974e5ac3449dd4e33b.css`,
				},
				{
					Type: 'canonical',
					HREF: `${request.protocol}://${request.hostname}${request.url}`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'CookieConstraint', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/037fb8ca3f7315582e7e58889c592b4916b73fb34f60e1c97be8d3b8fe45a1f9.css`,
				},
				{
					Type: 'stylesheet',
					Bundle: { Name: 'RobuxIcon', Source: 'Main' },
					HREF: `${request.protocol}://css.rbxcdn.com/d54c0248f0ca2d30095e96e752fc86b728bf4b2840605e1e1ada6dd906648979.css`,
				},
			],
			urlMetadata: {
				Hosts: Hosts,
				Protocol: request.protocol,
			},
			MetaScripts: [
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/jquery/jquery-1.11.1.min.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/jquery/jquery-migrate-1.2.1.min.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/Microsoft/MicrosoftAjax.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/roblox.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/common/constants.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/jquery.cookie.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/utilities/performance.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/RobloxCookies.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/utilities/minifyTestFile.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/RobloxEventStream.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/Events/UserInteractionsEvent.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/Events/PageHeartbeatEvent.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/services/userService.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/services/metaDataValues.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/utilities/localStorage.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/utilities/ExponentialBackoff.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/utilities/ExponentialBackoffSpecification.js'></script>",
				},
				{
					Rendered:
						"<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' type='text/javascript' src='/js/Reference/themeUpdate.js'></script>",
				},
				{
					Rendered:
						'<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Polyfill" data-bundle-source="Main" src="https://js.rbxcdn.com/e01f6b22b565ed6f987cdc7616f3c4dfd2dc422aaf5ba760860e10b1d972e1c1.js"></script>',
				},
				{
					Rendered:
						'<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="XsrfProtection" data-bundle-source="Main" src="https://js.rbxcdn.com/90489d38bf2a230a9d744e79da8a606a55a678238272381a258f0f3f0ee6bafd.js"></script>',
				},
				{
					Rendered:
						'<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="HeaderScripts" data-bundle-source="Main" src="https://js.rbxcdn.com/20ca2b5f08e257a5f1dbb380504e8113aea7004749d54998af4d65ae0b1b9a73.js"></script>',
				},
				{
					Rendered:
						'<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Sentry" data-bundle-source="Main" src="https://js.rbxcdn.com/51989ce436c3c5e6fad60901860a475dac041b97c9ce887364b352f2c794da65.js"></script>',
				},
				{
					Rendered:
						'<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="RobloxTracer" data-bundle-source="Main" src="https://js.rbxcdn.com/301c59adc1a33e5d2f7b074cb3e2a2b4889d07b5b12bba525d455679829a5c72.js"></script>',
				},
			],
		});
	},
};
