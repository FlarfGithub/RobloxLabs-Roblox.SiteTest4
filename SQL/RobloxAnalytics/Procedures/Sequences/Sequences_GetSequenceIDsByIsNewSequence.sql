CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`Sequences_GetSequenceIDsByIsNewSequence`;

CREATE PROCEDURE `RobloxAnalytics`.`Sequences_GetSequenceIDsByIsNewSequence`
(
    IsNewSequence                BOOLEAN
)
BEGIN

SELECT
    ID
FROM 
    Sequences
WHERE
    (IsNewSequence = IsNewSequence);

END;