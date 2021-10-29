CREATE TABLE `robloxanalytics`.`servicecontext` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ServiceContextName` text NOT NULL COMMENT 'The name of this ServiceContext',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Represents the Enumeration Roblox.Data.Counters.ServiceContext to be used with foreign keys.';
