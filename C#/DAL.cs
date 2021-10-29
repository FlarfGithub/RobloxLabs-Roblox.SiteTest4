using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Roblox.Common;
using Roblox.Common.Persistence;

namespace Roblox.Data.Counters
{
    internal class SequenceDAL
    {
        private int _ID = default(int);
        private string _Name = default(string);
		private DateTime _Created = default(DateTime);
		private DateTime _Updated = default(DateTime);
		private string _Context = default(string);
		private string _Action = default(string);
		private double _Value = default(double);
		private bool _IsV2Sequence = default(bool);

        internal int ID
        {
            get { return _ID; }
            set { _ID = value; } 
        }

		 internal string Name
        {
            get { return _Name; }
            set { _Name = value; } 
        }

		 internal DateTime Created
        {
            get { return _Created; }
            set { _Created = value; } 
        }

		 internal DateTime Updated
        {
            get { return _Updated; }
            set { _Updated = value; } 
        }

		 internal string Context
        {
            get { return _Context; }
            set { _Context = value; } 
        }

		 internal string Action
        {
            get { return _Action; }
            set { _Action = value; } 
        }

		 internal double Value
        {
            get { return _Value; }
            set { _Value = value; } 
        }

		 internal bool IsV2Sequence
        {
            get { return _IsV2Sequence; }
            set { _IsV2Sequence = value; } 
        }

        private static string RobloxAnalytics
        {
            get { return "RobloxAnalytics"; }
        }

        internal SequenceDAL()
        {
        }

        internal void Delete()
        {
            if (_ID == default(int))
                throw new ApplicationException("Required value not specified: ID.");

            var queryParameters = new List<SqlParameter>
            {
                new SqlParameter("@ID", _ID)
            };

            var dbInfo = new dbInfo(
                RobloxAnalytics,
                "Sequences_DeleteSequence",
                queryParameters
            );

            EntityHelper.DoEntityDALDelete(dbInfo);
        }
        internal void Insert()
        {
            var queryParameters = new List<SqlParameter>
            {
		new SqlParameter("@Name", _Name),
		new SqlParameter("@Created", _Created),
		new SqlParameter("@Updated", _Updated),
		new SqlParameter("@Context", _Context),
		new SqlParameter("@Action", _Action),
		new SqlParameter("@Value", _Value),
		new SqlParameter("@IsV2Sequence", _IsV2Sequence),
            };
			
            var dbInfo = new dbInfo(
                RobloxAnalytics,
                "Sequences_InsertSequence",
                new SqlParameter("@ID", Int),
                queryParameters
            );

            _ID = EntityHelper.DoEntityDALInsert<int>(dbInfo);
        }
        internal void Update()
        {
            var queryParameters = new List<SqlParameter>
            {
		new SqlParameter("@ID", _ID),
		new SqlParameter("@Name", _Name),
		new SqlParameter("@Created", _Created),
		new SqlParameter("@Updated", _Updated),
		new SqlParameter("@Context", _Context),
		new SqlParameter("@Action", _Action),
		new SqlParameter("@Value", _Value),
		new SqlParameter("@IsV2Sequence", _IsV2Sequence),
            };
			
            var dbInfo = new dbInfo(
                RobloxAnalytics,
                "Sequences_UpdateSequence",
                queryParameters
            );

            EntityHelper.DoEntityDALUpdate(dbInfo);
        }

        private static SequenceDAL BuildDAL(SqlDataReader reader)
        {
            var dal = new SequenceDAL();

            while (reader.Read())
            {
                dal.ID = (int)reader["ID"];
                dal.Name = (string)reader["Name"];
                dal.Created = (DateTime)reader["Created"];
                dal.Updated = (DateTime)reader["Updated"];
                dal.Context = (string)reader["Context"];
                dal.Action = (string)reader["Action"];
                dal.Value = (double)reader["Value"];
                dal.IsV2Sequence = (bool)reader["IsV2Sequence"];
            }

            if (dal.ID == default(int))
                return null;

            return dal;
        }
        
        internal static SequenceDAL Get(int id)
        {
            if (id == default(int))
                return null;

            var queryParameters = new List<SqlParameter>
            {
                new SqlParameter("@ID", id)
            };

            var dbInfo = new dbInfo(
                RobloxAnalytics,
                "Sequences_GetSequence",
                queryParameters
            );

            return EntityHelper.GetEntityDAL(dbInfo, BuildDAL);
        }

        internal static ICollection<int> GetSequenceIDsByName(string Name)
        {
            if (Name == default(string))
                throw new ApplicationException("Required value not specified: Name.");

            var queryParameters = new List<SqlParameter>();
            queryParameters.Add(new SqlParameter("@Name", Name));

            return EntityHelper.GetDataEntityIDCollection<int>(
                new dbInfo(
                    RobloxAnalytics,
                    "Sequences_GetSequenceIDsByName",
                    queryParameters
                )
            );
        }

		internal static ICollection<int> GetSequenceIDsByContext(string Context)
        {
            if (Context == default(string))
                throw new ApplicationException("Required value not specified: Context.");

            var queryParameters = new List<SqlParameter>();
            queryParameters.Add(new SqlParameter("@Context", Context));

            return EntityHelper.GetDataEntityIDCollection<int>(
                new dbInfo(
                    RobloxAnalytics,
                    "Sequences_GetSequenceIDsByContext",
                    queryParameters
                )
            );
        }

		internal static ICollection<int> GetSequenceIDsByAction(string Action)
        {
            if (Action == default(string))
                throw new ApplicationException("Required value not specified: Action.");

            var queryParameters = new List<SqlParameter>();
            queryParameters.Add(new SqlParameter("@Action", Action));

            return EntityHelper.GetDataEntityIDCollection<int>(
                new dbInfo(
                    RobloxAnalytics,
                    "Sequences_GetSequenceIDsByAction",
                    queryParameters
                )
            );
        }

		internal static ICollection<int> GetSequenceIDsByIsV2Sequence(bool IsV2Sequence)
        {
            if (IsV2Sequence == default(bool))
                throw new ApplicationException("Required value not specified: IsV2Sequence.");

            var queryParameters = new List<SqlParameter>();
            queryParameters.Add(new SqlParameter("@IsV2Sequence", IsV2Sequence));

            return EntityHelper.GetDataEntityIDCollection<int>(
                new dbInfo(
                    RobloxAnalytics,
                    "Sequences_GetSequenceIDsByIsV2Sequence",
                    queryParameters
                )
            );
        }
    }
}
