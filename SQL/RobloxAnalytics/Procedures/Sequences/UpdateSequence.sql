CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`UpdateSequence`;

CREATE PROCEDURE `RobloxAnalytics`.`UpdateSequence`
(
    ID                	  INT
	, Created			  DATETIME
	, Updated			  DATETIME
	, Name				  TEXT
	, IsNewSequence 	  BOOLEAN
	, Value				  DOUBLE
)
BEGIN

UPDATE
    ServiceContexts
SET
Created = Created
, Updated = Updated
, Name = Name
, IsNewSequence = IsNewSequence
, Value = Value
WHERE
    (ID = ID);

END;