CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

CREATE TABLE IF NOT EXISTS `RobloxAnalytics`.`ServiceContexts` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Created` DATETIME NOT NULL,
  `Updated` DATETIME NOT NULL,
  `Name` TEXT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`DeleteServiceContext`;

CREATE PROCEDURE `RobloxAnalytics`.`DeleteServiceContext`
(
    ID            INT
)
BEGIN

DELETE FROM
    ServiceContexts
WHERE
    (ID = ID);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetServiceContext`;

CREATE PROCEDURE `RobloxAnalytics`.`GetServiceContext`
(
    ID            INT
)
BEGIN

SELECT
    ID
	,Created
	,Updated
	,Name
FROM
    ServiceContexts
WHERE
    (ID = ID);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`InsertServiceContext`;

CREATE PROCEDURE `RobloxAnalytics`.`InsertServiceContext`
(
    OUT ID                INT
	, Created			  DATETIME
	, Updated			  DATETIME
	, Name				  TEXT
)
BEGIN

INSERT INTO
    ServiceContexts
(
Created
, Updated
, Name
)
VALUES
(
Created
, Updated
, Name
);

SET ID = LAST_INSERT_ID();
SELECT LAST_INSERT_ID();

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByName`;

CREATE PROCEDURE `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByName`
(
    Name                TEXT
)
BEGIN

SELECT
    ID
FROM 
    ServiceContexts
WHERE
    (Name = Name);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`UpdateServiceContext`;

CREATE PROCEDURE `RobloxAnalytics`.`UpdateServiceContext`
(
    ID                	  INT
	, Created			  DATETIME
	, Updated			  DATETIME
	, Name				  TEXT
)
BEGIN

UPDATE
    ServiceContexts
SET
Created = Created
, Updated = Updated
, Name = Name
WHERE
    (ID = ID);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByCreated`;

CREATE PROCEDURE `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByCreated`
(
    Created                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    ServiceContexts
WHERE
    (Created = Created);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByUpdated`;

CREATE PROCEDURE `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByUpdated`
(
    Updated                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    ServiceContexts
WHERE
    (Updated = Updated);

END;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetAllServiceContexts`;

CREATE PROCEDURE `RobloxAnalytics`.`GetAllServiceContexts`
()
BEGIN

SELECT
	*
FROM 
	ServiceContexts;

END;