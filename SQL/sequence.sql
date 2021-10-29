CREATE TABLE `robloxanalytics`.`sequence` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `SequenceContext` text COLLATE utf8_bin NOT NULL COMMENT 'The context of the sequence, usually the first index of the split ''_''',
  `SequenceName` text COLLATE utf8_bin NOT NULL COMMENT 'The name of the sequence, usually the second index of the split ''_''',
  `SequenceAction` text COLLATE utf8_bin NOT NULL COMMENT 'The name of the sequence action, usually the 3rd index of the split ''_'', can also be known as the SequenceStatus',
  `SequenceValue` double DEFAULT NULL COMMENT 'A value for this Sequence to have.\n',
  `SequenceCreated` datetime NOT NULL COMMENT 'When was this sequence created, ISO format.',
  `SequenceLastUpdated` datetime NOT NULL COMMENT 'When was this sequence last updated.',
  `SequencePurgeDate` datetime NOT NULL COMMENT 'Legacy, the purge that gets set to 50+ years from the current time.',
  `IsNewSequence` tinyint NOT NULL COMMENT 'IsNewSequence determines if the sequence is context is alread registered in the DB.',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Represents the SequenceStatistic';
