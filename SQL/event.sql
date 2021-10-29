CREATE TABLE `robloxanalytics`.`event` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `ServiceContext` int NOT NULL COMMENT 'The Service Context, usually in the url, like ''www/e.png''',
  `EventContext` text NOT NULL COMMENT 'The event context, given with the param ''ctx''',
  `EventName` text NOT NULL COMMENT 'The event name, given with the param ''evt''',
  `URL` text COMMENT 'The event url, given with the param ''url'', CAN BE NULL',
  `DateRecorded` datetime NOT NULL COMMENT 'The original date that the event was recorded.',
  `Count` double NOT NULL COMMENT 'The count of how many times this event has been fired.',
  `LastDateRecorded` datetime NOT NULL COMMENT 'The last date that this event was fired.',
  `AditionalArguments` json NOT NULL COMMENT 'A JSON Object containing key-value pairs for the other values in the request.',
  PRIMARY KEY (`Id`),
  KEY `FK_ServiceContext_idx` (`ServiceContext`),
  CONSTRAINT `FK_ServiceContext` FOREIGN KEY (`ServiceContext`) REFERENCES `servicecontext` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='This defines the IEvent entity for Roblox.Analytics';
