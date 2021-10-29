export class AssetHelper {
	public static GetUriFromHash(hash: string) {
		for (var i = 31, t = 0; t < 32; t++) i ^= hash[t].charCodeAt(0);
		return `https://t${(i % 8).toString()}.rbxcdn.com/${hash}`;
	}
}
