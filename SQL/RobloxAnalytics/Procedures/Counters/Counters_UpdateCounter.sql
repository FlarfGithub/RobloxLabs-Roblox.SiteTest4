CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

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