import { SqlClientEncryptionAlgorithm } from './SqlClientEncryptionAlgorithm';
import { SqlEncryptionKeyInfo } from './SqlEncryptionKeyInfo';
import { SqlTceCipherInfoEntry } from './SqlTceCipherInfoEntry';

export class SqlCipherMetadata {
	public get EncryptionInfo() {
		return this._sqlTceCipherInfoEntry;
	}
	public set EncryptionInfo(value: SqlTceCipherInfoEntry) {
		this._sqlTceCipherInfoEntry = value;
	}

	public get CipherAlgorithmId() {
		return this._cipherAlgorithmId;
	}

	public CipherAlgorithmName() {
		return this._cipherAlgorithmName;
	}

	public get EncryptionType() {
		return this._encryptionType;
	}

	public get NormalizationRuleVersion() {
		return this._normalizationRuleVersion;
	}

	public get CipherAlgorithm() {
		return this._sqlClientEncryptionAlgorithm;
	}
	public set CipherAlgorithm(value: SqlClientEncryptionAlgorithm) {
		this._sqlClientEncryptionAlgorithm = value;
	}

	public get EncryptionKeyInfo() {
		return this._sqlEncryptionKeyInfo;
	}
	public set EncryptionKeyInfo(value: SqlEncryptionKeyInfo) {
		this._sqlEncryptionKeyInfo = value;
	}

	public get CekTableOrdinal() {
		return this._ordinal;
	}

	public constructor(
		sqlTceCipherInfoEntry: SqlTceCipherInfoEntry = null,
		ordinal: number,
		cipherAlgorithmId: number,
		cipherAlgorithmName: string,
		encryptionType: number,
		normalizationRuleVersion: number,
	) {
		this._sqlTceCipherInfoEntry = sqlTceCipherInfoEntry;
		this._ordinal = ordinal;
		this._cipherAlgorithmId = cipherAlgorithmId;
		this._cipherAlgorithmName = cipherAlgorithmName;
		this._encryptionType = encryptionType;
		this._normalizationRuleVersion = normalizationRuleVersion;
		this._sqlEncryptionKeyInfo = null;
	}

	public IsAlgorithmInitialized(): boolean {
		return this._sqlClientEncryptionAlgorithm != null;
	}

	private _sqlTceCipherInfoEntry?: SqlTceCipherInfoEntry;

	private readonly _cipherAlgorithmId: number;

	private readonly _cipherAlgorithmName: string;

	private readonly _encryptionType: number;

	private readonly _normalizationRuleVersion: number;

	private _sqlClientEncryptionAlgorithm: SqlClientEncryptionAlgorithm;

	private _sqlEncryptionKeyInfo?: SqlEncryptionKeyInfo;

	private readonly _ordinal: number;
}
