import { FTUXAssetIdArray } from './FTUXAssetIdArray';
import { FTUXBodiesType } from './FTUXBodiesType';
import { FTUXBodyColorType } from './FTUXBodyColorType';

export interface FTUXAssetMap {
	bodies: FTUXBodiesType[];
	bodyColors: FTUXBodyColorType[];
	clothing: FTUXAssetIdArray[];
	heads: FTUXAssetIdArray[];
}
