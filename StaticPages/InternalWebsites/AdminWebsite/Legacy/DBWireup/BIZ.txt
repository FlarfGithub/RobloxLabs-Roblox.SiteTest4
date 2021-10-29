using System;
using System.Collections.Generic;
using Roblox;
using Roblox.Caching;
using Roblox.Common;
using Roblox.Data.Interfaces;

namespace <NAMESPACE>
{
    internal class <BIZCLASSNAME> : IRobloxEntity<<IDTYPE>, <CLASSNAME>> <BIZREMOTECACHEABLE>
    {
        private <CLASSNAME> _EntityDAL;

        public <IDTYPE> ID
        { 
            get { return _EntityDAL.ID; }
        }

        <BIZPROPERTIES>

        public <BIZCLASSNAME>()
        {
            _EntityDAL = new <CLASSNAME>();
        }
        
		internal void Delete()
        {
            EntityHelper.DeleteEntity(
                this,
                _EntityDAL.Delete
            );
        }
        internal void Save()
        {
            EntityHelper.SaveEntity(
                this,
                () =>
                {
                    _EntityDAL.Created = DateTime.Now;
                    _EntityDAL.Updated = _EntityDAL.Created;
                    _EntityDAL.Insert();
                },
                () =>
                {
                    _EntityDAL.Updated = DateTime.Now;
                    _EntityDAL.Update();
                }
            );
        }
        
        private static <BIZCLASSNAME> CreateNew(<CREATENEWPARAMS>)
        {
            var entity = new <BIZCLASSNAME>();
            <CREATENEWPROPERTYSETTERS>
            entity.Save();

            return entity;
        }
        internal static <BIZCLASSNAME> Get(<IDTYPE> id)
        {
            return EntityHelper.GetEntity<<IDTYPE>, <CLASSNAME>, <BIZCLASSNAME>>(
                EntityCacheInfo,
                id,
                () => <CLASSNAME>.Get(id)
            );
        }

        #$@#@ - Unique ID used to find this section, don't change it. 599W#%2
        internal static ICollection<<BIZCLASSNAME>> Get<BIZCLASSNAME>sBy<FKPROPERTYNAME>(<FKIDTYPE> <FKPROPERTYNAME>)
        {
            string collectionId = string.Format("Get<BIZCLASSNAME>sBy<FKPROPERTYNAME>_<FKPROPERTYNAME>:{0}", <FKPROPERTYNAME>);
            return EntityHelper.GetEntityCollection<<BIZCLASSNAME>, <IDTYPE>>(
                EntityCacheInfo,
                new CacheManager.CachePolicy(
                    CacheManager.CacheScopeFilter.Qualified,
                    string.Format("<FKPROPERTYNAME>:{0}", <FKPROPERTYNAME>)
                ),
                collectionId,
                () => <BIZCLASSNAME>DAL.Get<BIZCLASSNAME>IDsBy<FKPROPERTYNAME>(<FKPROPERTYNAME>),
                Get
            );
        }
        #$@#@2 - Unique ID used to find this section, don't change it.  599W#%44

        public void Construct(<CLASSNAME> dal)
        {
            _EntityDAL = dal;
        }

        public CacheInfo CacheInfo
        {
            get { return EntityCacheInfo; }
        }

        public static CacheInfo EntityCacheInfo = new CacheInfo(
            new CacheabilitySettings(collectionsAreCacheable: true, countsAreCacheable: true, entityIsCacheable: true, idLookupsAreCacheable: true, hasUnqualifiedCollections: true),
            typeof(<BIZCLASSNAME>).ToString(),
            true
        );

        public IEnumerable<string> BuildEntityIDLookups()
        {
            yield break;
        }

        public IEnumerable<StateToken> BuildStateTokenCollection()
        {
            %^^^^yield return new StateToken(string.Format("<FKPROPERTYNAME>:{0}", <FKPROPERTYNAME>));^^^^%
            yield break;
        }

        <BIZREMOTECACHEABLEREGION>
    }
}