CREATE TABLE `clientversion` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ClientName` text COLLATE ascii_bin NOT NULL,
  `LatestMD5Hash` text COLLATE ascii_bin NOT NULL,
  `LastMD5Hash` text COLLATE ascii_bin,
  `LatestVersion` text COLLATE ascii_bin NOT NULL,
  `LastVersion` text COLLATE ascii_bin,
  `LatestSecurityVersion` text COLLATE ascii_bin NOT NULL,
  `LastSecurityVersion` text COLLATE ascii_bin,
  `LatestCDNVersion` text COLLATE ascii_bin NOT NULL,
  `LastCDNVersion` text COLLATE ascii_bin,
  `DateUploaded` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=ascii COLLATE=ascii_bin;
