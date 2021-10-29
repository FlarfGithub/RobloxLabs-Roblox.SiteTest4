CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`InsertSequence`;

CREATE PROCEDURE `RobloxAnalytics`.`InsertSequence`
(
    OUT ID                BIGINT
	, Created 			  DATETIME
	, Updated			  DATETIME
	, Name				  TEXT
	, IsNewSequence		  BOOLEAN
	, Value				  DOUBLE
)
BEGIN

INSERT INTO
    Sequences
(
Created
, Updated
, Name
, IsNewSequence
, Value
)
VALUES
(
Created
, Updated
, Name
, IsNewSequence
, Value
);

SET ID = LAST_INSERT_ID();
SELECT LAST_INSERT_ID();

END;