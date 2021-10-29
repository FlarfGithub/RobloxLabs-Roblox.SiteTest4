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
			isUpdateUsernameEnabled: true,
			ftuxAvatarAssetMap:
				'{"v1":{"bodies":[{"c":{"assetIds":[3963991843,3963968066,3963974041,3963969971,3963990231],"scale":{"bodyType":1,"height":1,"width":1,"head":0.95,"proportion":0}}},{"nm":{"assetIds":[86500008,86500054,86500036,86500064,86500078],"scale":{"bodyType":0.5,"height":1,"width":1,"head":1,"proportion":0}}},{"nf":{"assetIds":[86499666,86499716,86499698,86499753,86499793],"scale":{"bodyType":0.5,"height":1,"width":0.9,"head":0.95,"proportion":0}}},{"sm":{"assetIds":[376532000,376530220,376531012,376531300,376531703],"scale":{"bodyType":0.5,"height":1,"width":0.75,"head":0.95,"proportion":0.3}}},{"sf":{"assetIds":[376547767,376547633,376547341,376546668,376547092],"scale":{"bodyType":0.5,"height":1,"width":0.7,"head":0.95,"proportion":0.3}}},{"rm":{"assetIds":[3963871432,3963861732,3963867514,3963864909,3963869770],"scale":{"bodyType":1,"height":1,"width":1,"head":1,"proportion":0}}},{"rf":{"assetIds":[3963485362,3963476651,3963481369,3963479563,3963483107],"scale":{"bodyType":1,"height":1,"width":1,"head":1,"proportion":0}}}],"bodyColors":[{"do":334},{"bl":352},{"bn":217},{"ng":18},{"po":1025},{"lo":125}],"clothing":[{"gj":[382538059,382537569]},{"dw":[144076436,382537950]},{"ps":[4047884939,398635338]},{"pt":[4047886060,382537806]},{"gt":[4047884046,382538503]},{"dj":[398633584,144076512]},{"rsg":[3670737444,144076760]},{"rsb":[3670737444,398633812]}],"heads":[{"cm":[376548738,4018617474,2432102561]},{"cf":[2956239660,4018627046,2432102561]},{"nm":[451221329,616380929,2432102561]},{"nf":[1103003368,616380929,2432102561]},{"sm":[62234425,86487700,86498048]},{"sf":[451220849,86487766,86498113]},{"rm":[3963874672,3643502288]},{"rf":[3963490791,3669152260]}]},"v2":{"bodies":[{"classic-m":{"assetIds":[4637244207,4637116155,4637242874,4637242166,4637243648],"scale":{"bodyType":0,"head":0.95,"height":1,"proportion":0,"width":1}}},{"classic-f":{"assetIds":[4637265517,4637262680,4637263998,4637263492,4637264878],"scale":{"bodyType":0,"head":0.95,"height":1,"proportion":0,"width":1}}},{"neo-m":{"assetIds":[4637290950,4637157175,4637286849,4637285693,4637289137],"scale":{"bodyType":0,"head":0.95,"height":1,"proportion":0,"width":1}}},{"neo-f":{"assetIds":[4637151279,4637119437,4637120775,4637120072,4637122096],"scale":{"bodyType":0,"head":0.95,"height":1,"proportion":0,"width":0.9}}},{"style-m":{"assetIds":[376532000,376530220,376531012,376531300,376531703],"scale":{"bodyType":0.5,"head":0.95,"height":1,"proportion":0.3,"width":0.75}}},{"style-f":{"assetIds":[376547767,376547633,376547341,376546668,376547092],"scale":{"bodyType":0.5,"head":0.95,"height":1,"proportion":0.3,"width":0.7}}},{"rthro-m":{"assetIds":[3963871432,3963861732,3963867514,3963864909,3963869770],"scale":{"bodyType":1,"head":1,"height":1,"proportion":0,"width":1}}},{"rthro-f":{"assetIds":[3963485362,3963476651,3963481369,3963479563,3963483107],"scale":{"bodyType":1,"head":1,"height":1,"proportion":0,"width":1}}}],"bodyColors":[{"nougat":18},{"pastelOrange":1025},{"lightOrange":125},{"darkOrange":38}],"clothing":[{"roblox-shirt":[4637596615,4637601297]},{"denim-white":[4637603462,4637605284]},{"zipup-jacket":[4637617396,4637618900]},{"purple-top":[4637611578,4637612548]},{"guitar-tee":[4047884046,382538503]},{"denim-jacket":[398633584,144076512]},{"rbx-green":[3670737444,144076760]},{"rbx-black":[3670737444,398633812]}],"heads":[{"classic-m":[4637254498,4637244809,4637245706]},{"classic-f":[4637267557,4637266368,4637266996]},{"neo-m":[4637431811,4637291815,4637163809]},{"neo-f":[4637156063,4637166178,4637441617]},{"style-m":[62234425,86487700,86498048]},{"style-f":[451220849,86487766,86498113]},{"rthro-m":[3963874672,3643502288]},{"rthro-f":[3963490791,3669152260]}]}}',
			IsEmailUpsellAtLogoutEnabled: true,
			IsAccountRecoveryPromptEnabled: true,
		});
	},
};
