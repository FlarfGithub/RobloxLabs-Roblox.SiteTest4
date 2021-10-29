import { AvatarAnimationsModel } from './AvatarAnimationsModel';
import { AvatarScalingModel } from './AvatarScalingModel';
import { AvatarBodyColorsModel } from './AvtarBodyColorsModel';

export interface AvatarFetchResponseModel {
	ResolvedAvatarType: string;
	AccessoryVersionIds: long[];
	EquippedGearVersionIds: long[];
	BackpackGearVersionIds: long[];
	BodyColors: AvatarBodyColorsModel;
	Animations: AvatarAnimationsModel;
	Scales: AvatarScalingModel;
}
