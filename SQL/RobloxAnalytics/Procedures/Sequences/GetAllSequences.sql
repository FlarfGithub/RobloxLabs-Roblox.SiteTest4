CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetAllSequences`;

CREATE PROCEDURE `RobloxAnalytics`.`GetAllSequences`
()
BEGIN

SELECT
	*
FROM 
	Sequences;

END;