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

import {
	DFFlag,
	DFInt,
	DFString,
	DYNAMIC_FASTFLAG,
	DYNAMIC_FASTINT,
	DYNAMIC_FASTSTRING,
} from '../../../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

DYNAMIC_FASTSTRING('RobloxLabsSecurityToken');
DYNAMIC_FASTINT('WWWAuthV1MaxAuthTokenAge');
DYNAMIC_FASTFLAG('NoMaintenance');
DYNAMIC_FASTFLAG('CanAdminsBypassTheSystem');

export default {
	method: 'all',
	func: async (_req, res) => {
		if (_req.method === 'OPTIONS') return res.send();
		/*Check if the IP address is in the IP filter*/
		// For now we will just always validate the request
		if (!DFFlag('CanAdminsBypassTheSystem') || DFFlag('NoMaintenance')) return res.status(401).send();
		return res
			.status(200)
			.cookie('RobloxSecurityToken', DFString('RobloxLabsSecurityToken'), {
				maxAge: DFInt('WWWAuthV1MaxAuthTokenAge'),
				domain: '.sitetest4.robloxlabs.com',
				secure: false,
				sameSite: 'lax',
				httpOnly: true,
			})
			.send({ success: true });
	},
};
