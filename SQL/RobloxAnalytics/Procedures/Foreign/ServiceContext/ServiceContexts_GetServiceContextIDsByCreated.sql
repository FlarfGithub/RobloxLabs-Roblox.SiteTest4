CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByCreated`;

CREATE PROCEDURE `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByCreated`
(
    Created                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    ServiceContexts
WHERE
    (Created = Created);

END;