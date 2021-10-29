CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetAllCounters`;

CREATE PROCEDURE `RobloxAnalytics`.`GetAllCounters`
()
BEGIN

SELECT
	*
FROM 
	Counters;

END;