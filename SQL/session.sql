CREATE TABLE `robloxmembership`.`session` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `UserId` bigint NOT NULL,
  `SessionToken` text NOT NULL,
  `Location` enum('SignUp','Login') NOT NULL DEFAULT 'SignUp',
  `UserAgent` text NOT NULL,
  `Created` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
