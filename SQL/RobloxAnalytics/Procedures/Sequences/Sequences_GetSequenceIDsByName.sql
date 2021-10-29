CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Sequences_GetSequenceIDsByName`;

CREATE PROCEDURE `RobloxAnalytics`.`Sequences_GetSequenceIDsByName`
(
    Name                TEXT
)
BEGIN

SELECT
    ID
FROM 
    Sequences
WHERE
    (Name = Name);

END;