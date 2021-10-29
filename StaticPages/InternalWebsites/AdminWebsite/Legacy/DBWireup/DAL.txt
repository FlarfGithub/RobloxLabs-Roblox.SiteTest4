using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Roblox.Common;
using Roblox.Common.Persistence;

namespace <NAMESPACE>
{
    internal class <DALCLASSNAME>
    {
        private <IDTYPE> _ID = default(<IDTYPE>);
<DALFIELDS>
        internal <IDTYPE> ID
        {
            get { return _ID; }
            set { _ID = value; } 
        }
<DALPROPERTIES>
        private static string <CONNECTIONSTRING>
        {
            get { return <CONNECTIONSTRINGVALUE>; }
        }

        internal <DALCLASSNAME>()
        {
        }

        internal void Delete()
        {
            if (_ID == default(<IDTYPE>))
                throw new ApplicationException("Required value not specified: ID.");

            var queryParameters = new List<SqlParameter>
            {
                new SqlParameter("@ID", _ID)
            };

            var dbInfo = new dbInfo(
                <CONNECTIONSTRING>,
                "<DELETEPROCEDURE>",
                queryParameters
            );

            EntityHelper.DoEntityDALDelete(dbInfo);
        }
        internal void Insert()
        {
            var queryParameters = new List<SqlParameter>
            {
		<QUERYPARAMETERS>
            };
			
            var dbInfo = new dbInfo(
                <CONNECTIONSTRING>,
                "<INSERTPROCEDURE>",
                new SqlParameter("@ID", <IDSQLDBTYPE>),
                queryParameters
            );

            _ID = EntityHelper.DoEntityDALInsert<<IDTYPE>>(dbInfo);
        }
        internal void Update()
        {
            var queryParameters = new List<SqlParameter>
            {
		new SqlParameter("@ID", _ID),
		<QUERYPARAMETERS>
            };
			
            var dbInfo = new dbInfo(
                <CONNECTIONSTRING>,
                "<UPDATEPROCEDURE>",
                queryParameters
            );

            EntityHelper.DoEntityDALUpdate(dbInfo);
        }

        private static <DALCLASSNAME> BuildDAL(SqlDataReader reader)
        {
            var dal = new <DALCLASSNAME>();

            while (reader.Read())
            {
                dal.ID = (<IDTYPE>)reader["ID"];
		<READERPARAMETERS>
            }

            if (dal.ID == default(<IDTYPE>))
                return null;

            return dal;
        }
        
        internal static <DALCLASSNAME> Get(<IDTYPE> id)
        {
            if (id == default(<IDTYPE>))
                return null;

            var queryParameters = new List<SqlParameter>
            {
                new SqlParameter("@ID", id)
            };

            var dbInfo = new dbInfo(
                <CONNECTIONSTRING>,
                "<GETPROCEDURE>",
                queryParameters
            );

            return EntityHelper.GetEntityDAL(dbInfo, BuildDAL);
        }
        #$@#@ - Unique ID used to find this section, don't change it. 599W#%2
        internal static ICollection<<IDTYPE>> Get<CLASSNAME>IDsBy<FKPROPERTYNAME>(<FKIDTYPE> <FKPROPERTYNAME>)
        {
            if (<FKPROPERTYNAME> == default(<FKIDTYPE>))
                throw new ApplicationException("Required value not specified: <FKPROPERTYNAME>.");

            var queryParameters = new List<SqlParameter>();
            queryParameters.Add(new SqlParameter("@<FKPROPERTYNAME>", <FKPROPERTYNAME>));

            return EntityHelper.GetDataEntityIDCollection<<IDTYPE>>(
                new dbInfo(
                    <CONNECTIONSTRING>,
                    "<CLASSNAME>s_Get<CLASSNAME>IDsBy<FKPROPERTYNAME>",
                    queryParameters
                )
            );
        }
        #$@#@2 - Unique ID used to find this section, don't change it.  599W#%44
    }
}
