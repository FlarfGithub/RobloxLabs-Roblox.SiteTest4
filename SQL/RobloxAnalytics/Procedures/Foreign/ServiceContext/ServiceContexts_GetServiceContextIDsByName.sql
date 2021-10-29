CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByName`;

CREATE PROCEDURE `RobloxAnalytics`.`ServiceContexts_GetServiceContextIDsByName`
(
    Name                TEXT
)
BEGIN

SELECT
    ID
FROM 
    ServiceContexts
WHERE
    (Name = Name);

END;