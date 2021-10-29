CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

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