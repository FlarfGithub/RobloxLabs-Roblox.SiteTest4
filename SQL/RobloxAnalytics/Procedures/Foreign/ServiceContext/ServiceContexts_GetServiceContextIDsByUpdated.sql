CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByUpdated`;

CREATE PROCEDURE `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByUpdated`
(
    Updated                DATETIME
)
BEGIN

SELECT
    ID
FROM 
    ServiceContexts
WHERE
    (Updated = Updated);

END;