CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetAllServiceContexts`;

CREATE PROCEDURE `RobloxAnalytics`.`GetAllServiceContexts`
()
BEGIN

SELECT
	*
FROM 
	ServiceContexts;

END;