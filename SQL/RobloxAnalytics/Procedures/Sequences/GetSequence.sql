CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetSequence`;

CREATE PROCEDURE `RobloxAnalytics`.`GetSequence`
(
    ID            INT
)
BEGIN

SELECT
    ID
	,Created
	,Updated
	,Name
	,IsNewSequence
	,Value
FROM
    Sequences
WHERE
    (ID = ID);

END;