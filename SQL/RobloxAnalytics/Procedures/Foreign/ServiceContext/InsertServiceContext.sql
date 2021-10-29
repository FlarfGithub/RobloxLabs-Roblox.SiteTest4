CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

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