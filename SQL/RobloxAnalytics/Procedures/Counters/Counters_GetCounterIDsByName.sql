CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByName`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByName`
(
    Name                TEXT
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Name = Name);

END;