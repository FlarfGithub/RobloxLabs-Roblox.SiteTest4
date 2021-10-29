CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByCreated`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByCreated`
(
    Created                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Created = Created);

END;