CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Sequences_GetSequenceIDsByValue`;

CREATE PROCEDURE `RobloxAnalytics`.`Sequences_GetSequenceIDsByValue`
(
    Value                DOUBLE
)
BEGIN

SELECT
    ID
FROM 
    Sequences
WHERE
    (Value = Value);

END;