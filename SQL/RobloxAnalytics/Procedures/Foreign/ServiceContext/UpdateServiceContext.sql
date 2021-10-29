CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

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