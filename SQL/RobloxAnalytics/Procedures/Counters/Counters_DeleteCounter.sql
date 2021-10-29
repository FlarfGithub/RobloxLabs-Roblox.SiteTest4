CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`DeleteCounter`;

CREATE PROCEDURE `RobloxAnalytics`.`DeleteCounter`
(
    ID            BIGINT
)
BEGIN

DELETE FROM
    Counters
WHERE
    (ID = ID);

END;