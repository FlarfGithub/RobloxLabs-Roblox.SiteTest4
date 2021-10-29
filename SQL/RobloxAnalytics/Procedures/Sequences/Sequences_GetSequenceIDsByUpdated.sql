CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Sequences_GetSequenceIDsByUpdated`;

CREATE PROCEDURE `RobloxAnalytics`.`Sequences_GetSequenceIDsByUpdated`
(
    Updated                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    Sequences
WHERE
    (Updated = Updated);

END;