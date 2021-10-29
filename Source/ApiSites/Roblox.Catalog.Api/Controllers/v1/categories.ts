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

export default {
	method: 'all',
	func: (_req, res): void => {
		return res.send({
			Featured: 0,
			All: 1,
			Collectibles: 2,
			Clothing: 3,
			BodyParts: 4,
			Gear: 5,
			Models: 6,
			Plugins: 7,
			Decals: 8,
			Audio: 9,
			Meshes: 10,
			Accessories: 11,
			AvatarAnimations: 12,
			CommunityCreations: 13,
			Video: 14,
			Recommended: 15,
		});
	},
};
