CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`DeleteServiceContext`;

CREATE PROCEDURE `RobloxAnalytics`.`DeleteServiceContext`
(
    ID            INT
)
BEGIN

DELETE FROM
    ServiceContexts
WHERE
    (ID = ID);

END;