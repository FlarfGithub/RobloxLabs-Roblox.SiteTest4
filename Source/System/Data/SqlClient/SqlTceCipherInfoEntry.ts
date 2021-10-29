import { SqlEncryptionKeyInfo } from './SqlEncryptionKeyInfo';

export class SqlTceCipherInfoEntry {
	public get Ordinal() {
		return this._ordinal;
	}
	public get DatabaseId() {
		return this._databaseId;
	}
	public get CekId() {
		return this._cekId;
	}
	public get CekVersion() {
		return this._cekVersion;
	}
	public get CekMdVersion() {
		return this._cekMdVersion;
	}
	public get ColumnEncryptionKeyValues() {
		return this._columnEncryptionKeyValues;
	}

	public Add(
		encryptedKey: number[],
		databaseId: number,
		cekId: number,
		cekVersion: number,
		cekMdVersion: number[],
		keyPath: string,
		keyStoreName: string,
		algorithmName: string,
	) {
		const item = new SqlEncryptionKeyInfo();

		item.encryptedKey = encryptedKey;
		item.databaseId = databaseId;
		item.cekId = cekId;
		item.cekVersion = cekVersion;
		item.cekMdVersion = cekMdVersion;
		item.keyPath = keyPath;
		item.keyStoreName = keyStoreName;
		item.algorithmName = algorithmName;
		this._columnEncryptionKeyValues.push(item);
		if (this._databaseId === 0) {
			this._databaseId = databaseId;
			this._cekId = cekId;
			this._cekVersion = cekVersion;
			this._cekMdVersion = cekMdVersion;
		}
	}

	public constructor(ordinal: number = 0) {
		this._ordinal = ordinal;
		this._databaseId = 0;
		this._cekId = 0;
		this._cekVersion = 0;
		this._cekMdVersion = null;
		this._columnEncryptionKeyValues = [];
	}

	private readonly _columnEncryptionKeyValues: SqlEncryptionKeyInfo[];

	private readonly _ordinal: number;

	private _databaseId: number;

	private _cekId: number;

	private _cekVersion: number;

	private _cekMdVersion: number[];
}
