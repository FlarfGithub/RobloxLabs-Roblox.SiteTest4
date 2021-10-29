CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

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