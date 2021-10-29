import { FilesClient } from '../../../ApiClients/Roblox.Files.Client/Roblox.Files.Client/Implementation/FilesClient';
import { IAssetRequestItem } from '../../../Platform/Assets/Roblox.Platform.Assets/IAssetRequestItem';

export namespace AssetRequestProcessor {
	export async function GetUri(
		assetHash: String,
		item: IAssetRequestItem,
		requireSecureUri: Boolean,
		isRequestedHashCopyrightProtected: Boolean,
		replacedHash: String,
	) {
		return <[Boolean, String]>(<unknown>await FilesClient.GetUri(replacedHash, requireSecureUri));
	}
}
