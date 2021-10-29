/*
	FileName: asset.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://www.sitetest4.robloxlabs.com/asset/, Redirects to assetdelivery

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

import dotenv from 'dotenv';
import { __baseDirName } from '../../../Assemblies/Common/Constants/Roblox.Common.Constants/Directories';

dotenv.config({ path: __baseDirName + '/.env' });

export default {
	method: 'all',
	func: (req, res): void => {
		if (req.query.id === '1') {
			res.redirect('http://static.sitetest4.robloxlabs.com/rbx/1.rbxlx');
			return;
		}
		res.redirect('http://assetdelivery.sitetest4.robloxlabs.com/v1' + req.url);
	},
};
