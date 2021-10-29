CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

CREATE TABLE IF NOT EXISTS `RobloxAnalytics`.`Counters` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `Created` DATETIME NOT NULL,
  `Updated` DATETIME NOT NULL,
  `Name` TEXT NOT NULL,
  `Value` DOUBLE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`InsertCounter`;

CREATE PROCEDURE `RobloxAnalytics`.`InsertCounter`
(
    OUT ID                BIGINT
	, Created 			  DATETIME
	, Updated			  DATETIME
	, Name				  TEXT
	, Value				  DOUBLE
)
BEGIN

INSERT INTO
    Counters
(
Created
, Updated
, Name
, Value
)
VALUES
(
Created
, Updated
, Name
, Value
);

SET ID = LAST_INSERT_ID();
SELECT LAST_INSERT_ID();

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`UpdateCounter`;

CREATE PROCEDURE `RobloxAnalytics`.`UpdateCounter`
(
    ID                	  INT
	, Created			  DATETIME
	, Updated			  DATETIME
	, Name				  TEXT
	, Value				  DOUBLE
)
BEGIN

UPDATE
    ServiceContexts
SET
Created = Created
, Updated = Updated
, Name = Name
, Value = Value
WHERE
    (ID = ID);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetCounter`;

CREATE PROCEDURE `RobloxAnalytics`.`GetCounter`
(
    ID            INT
)
BEGIN

SELECT
    ID
	,Created
	,Updated
	,Name
	,Value
FROM
    Counters
WHERE
    (ID = ID);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetAllCounters`;

CREATE PROCEDURE `RobloxAnalytics`.`GetAllCounters`
()
BEGIN

SELECT
	*
FROM 
	Counters;

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`DeleteCounter`;

CREATE PROCEDURE `RobloxAnalytics`.`DeleteCounter`
(
    ID            BIGINT
)
BEGIN

DELETE FROM
    Counters
WHERE
    (ID = ID);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByValue`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByValue`
(
    Value                DOUBLE
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Value = Value);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByUpdated`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByUpdated`
(
    Updated                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Updated = Updated);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByName`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByName`
(
    Name                TEXT
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Name = Name);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByCreated`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByCreated`
(
    Created                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Created = Created);

END;