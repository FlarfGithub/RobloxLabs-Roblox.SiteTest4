CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByUpdated`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByUpdated`
(
    Updated                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Updated = Updated);

END;