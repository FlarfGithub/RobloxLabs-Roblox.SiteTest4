CREATE TABLE `robloxmembership`.`sessionuser` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `IpAddress` text NOT NULL,
  `LanguageCode` text NOT NULL,
  `LanguageName` text NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
