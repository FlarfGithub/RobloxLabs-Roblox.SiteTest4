CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

CREATE TABLE IF NOT EXISTS `RobloxAnalytics`.`Events` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `Created` DATETIME NOT NULL,
  `Updated` DATETIME NOT NULL,
  `Name` TEXT NOT NULL,
  `ServiceContext` INT NOT NULL, /* FK */
  `Context` TEXT NOT NULL,
  `Count` DOUBLE NOT NULL,
  `AditionalArguments` JSON NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_ServiceContext_idx` (`ServiceContext`),
  CONSTRAINT `FK_ServiceContext` FOREIGN KEY (`ServiceContext`) REFERENCES `ServiceContexts` (`ID`)
) ENGINE=InnoDB;
