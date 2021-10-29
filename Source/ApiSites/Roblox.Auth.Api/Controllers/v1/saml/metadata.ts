/*
	FileName: LoadPlaceInfo.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Load Place info script
			
	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import json from 'xml-js';

export default {
	method: 'all',
	func: (_req, res): void => {
		const xml = json.js2xml(
			{
				EntityDescriptor: {
					_attributes: {
						ID: '_14aad3ee-cda3-4f38-b837-8d67693dcd1d',
						entityID: 'https://auth.sitetest4.robloxlabs.com/v1/saml/metadata',
						'xmlns:saml2': 'urn:oasis:names:tc:SAML:2.0:assertion',
						xmlns: 'urn:oasis:names:tc:SAML:2.0:metadata',
					},
					Signature: {
						_attributes: {
							xmlns: 'https://www.w3.org/2000/09/xmldsig#',
						},
						SignedInfo: {
							CanonicalizationMethod: {
								_attributes: {
									Algorithm: 'https://www.w3.org/2001/10/xml-exc-c14n#',
								},
							},
							SignatureMethod: {
								_attributes: {
									Algorithm: 'https://www.w3.org/2000/09/xmldsig#rsa-sha1',
								},
							},
							Reference: {
								_attributes: {
									URI: '#_14aad3ee-cda3-4f38-b837-8d67693dcd1d',
								},
								Transforms: {
									Transform: [
										{
											_attributes: {
												Algorithm: 'https://www.w3.org/2000/09/xmldsig#enveloped-signature',
											},
										},
										{
											_attributes: {
												Algorithm: 'https://www.w3.org/2001/10/xml-exc-c14n#',
											},
										},
									],
								},
								DigestMethod: {
									_attributes: {
										Algorithm: 'https://www.w3.org/2000/09/xmldsig#sha1',
									},
								},
								DigestValue: {
									_text: 'tWVkeoowT+jAmAYXz4ZfIJ9p6BA=',
								},
							},
						},
						SignatureValue: {
							_text: 'F2ao8NIlcYXJ/DMDGp2tm5mr9KUVM7CYSMNFiDJtQHgBTH0Z2kIMg0L3BBousTKOSRvfaNvcKt0AtQCLppOQzxrXM7iDjW9FSsYGoTmv68CbqjpB/AgjR/h1AJ1cHBxk63O8v0JRov3q1fDqL39gayWuz8OUxcbDvlgzQdAMIRPkQmYjWsh0J8Z1YTnmFNOVdKAXlgzyii62QaanSOpzieKnRzZuwbTf2vvIA0SZww9sKH6IGu2RDbfgoNuFnoUBG0G8ZQ0BeY3/zIcvrGj9J1zaZbCvNX5rhPgMZw/WioV6CvFH1HB2H4QVAdU56yTcecaN5isxNwYSbGXNdsQ8mfxZkPNgPtlpJGjErl5vuoEAsJtat1lL8wKvIjwaykGt50MGtkqMItiFm+nlMOuBmosv3ioWyhdZl6UTZh0f8nMeqzDNS/SYekLdegxtgUJOvgQnhUh8G4GILa+ZjJGH4vS11wxy3YrkyXhyDmils2q2N1Ccj6Bugur6lOKghKvqEcaBu7vJgyRAC3zC/JHUqk1bbdohO1305MqzJfvSWA2yLP9bUlDHUEyPORnMjFx+hFbyVG9sfWFo99FwlHim5WNXq1TUWyaUi7/mbTg6JyHQgMixR6U3pjg79r8p2zjY4XcCy1330BJNm16rYbLnp09FPtkF40YDSJwvL2jIJ6U=',
						},
						KeyInfo: {
							X509Data: {
								X509Certificate: {
									_text: 'MIIFRjCCAy4CCQCDWD1vnsQ0lzANBgkqhkiG9w0BAQsFADBlMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCVNhbiBNYXRlbzEPMA0GA1UECgwGUm9ibG94MSQwIgYDVQQDDBtEZXZSZWwgSklSQSBTQU1MIElkUCAoUHJvZCkwHhcNMjAxMDA1MTkwNzU3WhcNMjIxMDA1MTkwNzU3WjBlMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCVNhbiBNYXRlbzEPMA0GA1UECgwGUm9ibG94MSQwIgYDVQQDDBtEZXZSZWwgSklSQSBTQU1MIElkUCAoUHJvZCkwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCzHR+7CgZeCeyuMHpeEoYD6klzBz/jOn0FLw9P0NBRb/uRrZC41/6waFW7gFZvhv1K90qZAhe/Eo4Ldn76Vem/3Sdzw1DM2N6u6JSd6B5baNibQOf3IMyxy9IoNVLqDhZ3jnDKqAYIuqM7XdlHA5zD+Ogwq3Zn8BJS0mNTNTljswi5DZheeOOr8LVsUVVjMWg5UeC+jNdtjh/jsgcdD0MTNzoVde1QK1Vk3NpEQEfFdkh8vs8v5wuWJGxSxpjmcHD/5Ga+c+d5L+AURgOIBOjtTMpnElzf4rjSyfpIxMCWQz7FdnpBAUiIrhfNzkKZMzaoBg7lH43w4EPq9LCwGJ1FTl5TWiD1NNGCo/oNAp5/sibIcdM+n9x5I3alHZTu6bOq3sVg2e+Cckyv47AKoDOsCvUa4W+CE7HqhI5gm9tdh2bzmVWtJmoYFIgRazzwkieRbXJj52MppFp0XaXtR0KbC4saH8cMmC2xgp2bBqeD67qehsg+wKHJfxFXzvpJhp4V+yQLn/Afy6TIQ83hXCiKUuBvHkOTPto/zFlWazrOOKCNmW/t5YTxuO7yNYyRVtDyk+H93ppLZv3LKzxoxiMA0ymZHwOjPC/R3u9uLlekwz9mHO/kjPa8+Z04LevWidy6wgw4n1Ud2VoQCsMwjync6JF7NYx4GbFfgfMxmCthywIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQAwhHw6oF19bTV+C5M0sy3Z76JP+dVefPVoacmZBd9IcsIjiAsBgS24K7V8LpLNThVxJqWTlzl7r/5dRQxs1j/Ai37PsJf0lJDM8NHdF9rdOhj3EAf/WGsqLekD3WPyFD9wgQ0gonF7iWrGDnwhtEMwgZqJPBbZpd0ulo4oS0hHBVu8fnBtbcz2V2I9gYdxrRyUMNFtu2CZblisqG+MzR+3Nu5gXaezAq4lDuP06he2HYH1dPJqEM8ztI0dRcPIKcRnLWvWdYRoqOKXiasIQrDtvay2DV7shECWRNKqeOXZTjbaR5ADU+YBOW4O7LeqnwWfOhDGHPHMgwL+rR2QWbwckuhTlKH8nSQQxzXpRq4ytjzIPk7ohsP4XfZHcNePg2t5flqc5KgjfhmZtwHtVYUL+fu2jgZKOfggLcyVHpfs2gF5LLwHSVb9DOHhL+FVdtUHWRVxLqFNItl5KF1wK38MbWG444+O8qbTD993xwYpmp6R50bTdzEvpbf3VyDvTIMlf5RwwCAV2scJaZPPCwjR+TXgQQndvhj/BmXA3w40MOHEoQgtXDdHJCYA0zp9ScEJqtGeRyjqBrNdgrJ6JTWP83GPZI5rlxg2EFpS7Me58/s0QRmgW+UdZC3gLhp2SvNwyBbJfNuXN4uxvI6d1YkNmmEuF82ZlJP2/tWbiTY+yA==',
								},
							},
						},
					},
					IDPSSODescriptor: {
						_attributes: {
							protocolSupportEnumeration: 'urn:oasis:names:tc:SAML:2.0:protocol',
						},
						KeyDescriptor: {
							KeyInfo: {
								_attributes: {
									xmlns: 'https://www.w3.org/2000/09/xmldsig#',
								},
								X509Data: {
									X509Certificate: {
										_text: 'MIIFRjCCAy4CCQCDWD1vnsQ0lzANBgkqhkiG9w0BAQsFADBlMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCVNhbiBNYXRlbzEPMA0GA1UECgwGUm9ibG94MSQwIgYDVQQDDBtEZXZSZWwgSklSQSBTQU1MIElkUCAoUHJvZCkwHhcNMjAxMDA1MTkwNzU3WhcNMjIxMDA1MTkwNzU3WjBlMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExEjAQBgNVBAcMCVNhbiBNYXRlbzEPMA0GA1UECgwGUm9ibG94MSQwIgYDVQQDDBtEZXZSZWwgSklSQSBTQU1MIElkUCAoUHJvZCkwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCzHR+7CgZeCeyuMHpeEoYD6klzBz/jOn0FLw9P0NBRb/uRrZC41/6waFW7gFZvhv1K90qZAhe/Eo4Ldn76Vem/3Sdzw1DM2N6u6JSd6B5baNibQOf3IMyxy9IoNVLqDhZ3jnDKqAYIuqM7XdlHA5zD+Ogwq3Zn8BJS0mNTNTljswi5DZheeOOr8LVsUVVjMWg5UeC+jNdtjh/jsgcdD0MTNzoVde1QK1Vk3NpEQEfFdkh8vs8v5wuWJGxSxpjmcHD/5Ga+c+d5L+AURgOIBOjtTMpnElzf4rjSyfpIxMCWQz7FdnpBAUiIrhfNzkKZMzaoBg7lH43w4EPq9LCwGJ1FTl5TWiD1NNGCo/oNAp5/sibIcdM+n9x5I3alHZTu6bOq3sVg2e+Cckyv47AKoDOsCvUa4W+CE7HqhI5gm9tdh2bzmVWtJmoYFIgRazzwkieRbXJj52MppFp0XaXtR0KbC4saH8cMmC2xgp2bBqeD67qehsg+wKHJfxFXzvpJhp4V+yQLn/Afy6TIQ83hXCiKUuBvHkOTPto/zFlWazrOOKCNmW/t5YTxuO7yNYyRVtDyk+H93ppLZv3LKzxoxiMA0ymZHwOjPC/R3u9uLlekwz9mHO/kjPa8+Z04LevWidy6wgw4n1Ud2VoQCsMwjync6JF7NYx4GbFfgfMxmCthywIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQAwhHw6oF19bTV+C5M0sy3Z76JP+dVefPVoacmZBd9IcsIjiAsBgS24K7V8LpLNThVxJqWTlzl7r/5dRQxs1j/Ai37PsJf0lJDM8NHdF9rdOhj3EAf/WGsqLekD3WPyFD9wgQ0gonF7iWrGDnwhtEMwgZqJPBbZpd0ulo4oS0hHBVu8fnBtbcz2V2I9gYdxrRyUMNFtu2CZblisqG+MzR+3Nu5gXaezAq4lDuP06he2HYH1dPJqEM8ztI0dRcPIKcRnLWvWdYRoqOKXiasIQrDtvay2DV7shECWRNKqeOXZTjbaR5ADU+YBOW4O7LeqnwWfOhDGHPHMgwL+rR2QWbwckuhTlKH8nSQQxzXpRq4ytjzIPk7ohsP4XfZHcNePg2t5flqc5KgjfhmZtwHtVYUL+fu2jgZKOfggLcyVHpfs2gF5LLwHSVb9DOHhL+FVdtUHWRVxLqFNItl5KF1wK38MbWG444+O8qbTD993xwYpmp6R50bTdzEvpbf3VyDvTIMlf5RwwCAV2scJaZPPCwjR+TXgQQndvhj/BmXA3w40MOHEoQgtXDdHJCYA0zp9ScEJqtGeRyjqBrNdgrJ6JTWP83GPZI5rlxg2EFpS7Me58/s0QRmgW+UdZC3gLhp2SvNwyBbJfNuXN4uxvI6d1YkNmmEuF82ZlJP2/tWbiTY+yA==',
									},
								},
							},
						},
						SingleSignOnService: {
							_attributes: {
								Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:https-POST',
								Location: 'https://auth.sitetest4.robloxlabs.com/v1/saml/login',
							},
						},
					},
				},
			},
			{ compact: true, ignoreComment: true, spaces: 4 },
		);
		return res.contentType('xml').send(xml);
	},
};
