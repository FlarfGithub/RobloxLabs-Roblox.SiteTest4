import { FTUXAssetIdArray } from './FTUXAssetIdArray';
import { FTUXBodiesTypeV2 } from './FTUXBodiesTypeV2';
import { FTUXBodyColorType } from './FTUXBodyColorType';

export interface FTUXAssetMapV2 {
	bodies: FTUXBodiesTypeV2[];
	bodyColors: FTUXBodyColorType[];
	clothing: FTUXAssetIdArray[];
	heads: FTUXAssetIdArray[];
}
