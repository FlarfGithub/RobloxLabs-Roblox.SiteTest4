CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Counters_GetCounterIDsByValue`;

CREATE PROCEDURE `RobloxAnalytics`.`Counters_GetCounterIDsByValue`
(
    Value                DOUBLE
)
BEGIN

SELECT
    ID
FROM 
    Counters
WHERE
    (Value = Value);

END;