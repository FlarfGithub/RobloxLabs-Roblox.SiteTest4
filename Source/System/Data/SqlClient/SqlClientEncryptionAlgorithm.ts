export abstract class SqlClientEncryptionAlgorithm {
	public abstract EncryptData(plainText: number[]): number[];
	public abstract DecryptData(cipherText: number[]): number[];
}
