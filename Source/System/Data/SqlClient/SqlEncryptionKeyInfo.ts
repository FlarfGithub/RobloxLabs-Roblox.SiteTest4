export class SqlEncryptionKeyInfo {
	public encryptedKey: number[];

	public databaseId: number;

	public cekId: number;

	public cekVersion: number;

	public cekMdVersion: number[];

	public keyPath: string;

	public keyStoreName: string;

	public algorithmName: string;

	public normalizationRuleVersion: number;
}
