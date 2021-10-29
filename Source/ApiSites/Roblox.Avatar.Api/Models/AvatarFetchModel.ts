import { AvatarScalingModel } from '../../../Services/Roblox.ApiProxy.Service/Models/AvatarScalingModel';
import { AvatarBodyColorsModel } from '../../../Services/Roblox.ApiProxy.Service/Models/AvtarBodyColorsModel';
import { AssetIdAndTypeModel } from './AssetIdAndTypeModel';
import { EmoteModel } from './EmoteModel';

export interface AvatarFetchModel {
	resolvedAvatarType: 'R6' | 'R15';
	equippedGearVersionIds: long[];
	backpackGearVersionIds: long[];
	assetAndAssetTypeIds: AssetIdAndTypeModel[];
	animationAssetIds: any;
	bodyColors: AvatarBodyColorsModel;
	scales: AvatarScalingModel;
	emotes: EmoteModel[];
}
