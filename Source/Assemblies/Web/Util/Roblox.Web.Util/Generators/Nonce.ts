import crypto from 'crypto';

export class Nonce {
	public static GenerateBase64EncodedNonce(): [bigint, string] {
		let nonce = crypto.randomBytes(16);
		return [nonce.readBigUInt64BE(), nonce.toString('base64')];
	}
}
