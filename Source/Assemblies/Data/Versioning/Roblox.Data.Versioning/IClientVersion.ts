export interface IClientVersion {
	/*Int64*/ ID: System.Int64 /* PK, AI */;
	/*String*/ ClientName: System.String /* NN */;
	/*String*/ LatestMD5Hash: System.String /* NN */;
	/*String*/ LastMD5Hash: System.String;
	/*String*/ LatestVersion: System.String /* NN */;
	/*String*/ LastVersion: System.String;
	/*String*/ LatestSecurityVersion: System.String /* NN */;
	/*String*/ LastSecurityVersion: System.String;
	/*String*/ LatestCDNVersion: System.String /* NN */;
	/*String*/ LastCDNVersion: System.String;
	/*DateTime*/ DateUploaded: System.String /* NN */;
}
