CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Sequences_GetSequenceIDsByCreated`;

CREATE PROCEDURE `RobloxAnalytics`.`Sequences_GetSequenceIDsByCreated`
(
    Created                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    Sequences
WHERE
    (Created = Created);

END;