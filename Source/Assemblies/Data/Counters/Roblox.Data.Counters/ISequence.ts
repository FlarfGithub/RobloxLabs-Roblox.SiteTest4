export interface ISequence {
	/*Int64*/ Id: System.Int64 /* PK, NN, AI */;
	/* SequenceContext: The context of the sequence, usually the first index of the split '_' */
	/*String*/ SequenceContext: System.String /* NN */;
	/* SequenceName: The name of the sequence, usually the second index of the split '_' */
	/*String*/ SequenceName: System.String /* NN */;
	/* SequenceAction: The name of the sequence action, usually the 3rd index of the split '_', can also be known as the SequenceStatus */
	/*String*/ SequenceAction: System.String /* NN */;
	/* SequenceValue: A value for this Sequence to have. */
	/*Decimal*/ SequenceValue: System.Int64;
	/* SequenceCreated: When was this sequence created, ISO format. */
	/*DateTime*/ SequenceCreated: System.DateTime /* NN */;
	/* SequenceLastUpdated: When was this sequence last updated. */
	/*DateTime*/ SequenceLastUpdated: System.DateTime /* NN */;
	/* SequencePurgeDate: Legacy, the purge that gets set to 50+ years from the current time. */
	/*DateTime*/ SequencePurgeDate: System.DateTime /* NN */;
	/* IsNewSequence: IsNewSequence determines if the sequence is context is alread registered in the DB. */
	/*Boolean*/ IsNewSequence: System.Boolean /* NN */;
}
