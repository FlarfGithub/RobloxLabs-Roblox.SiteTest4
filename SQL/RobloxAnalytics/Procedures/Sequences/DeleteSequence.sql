CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`DeleteSequence`;

CREATE PROCEDURE `RobloxAnalytics`.`DeleteSequence`
(
    ID            BIGINT
)
BEGIN

DELETE FROM
    Sequences
WHERE
    (ID = ID);

END;