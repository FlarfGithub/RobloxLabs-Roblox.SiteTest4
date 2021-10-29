CREATE DATABASE IF NOT EXISTS `RobloxAnalytics`;

DROP PROCEDURE IF EXISTS `RobloxAnalytics`.`GetServiceContext`;

CREATE PROCEDURE `RobloxAnalytics`.`GetServiceContext`
(
    ID            INT
)
BEGIN

SELECT
    ID
	,Created
	,Updated
	,Name
FROM
    ServiceContexts
WHERE
    (ID = ID);

END;