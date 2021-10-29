CREATE SCHEMA IF NOT EXISTS `RobloxAnalytics` ;
CREATE TABLE IF NOT EXISTS `RobloxAnalytics`.`counter` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Count` bigint NOT NULL,
    PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;