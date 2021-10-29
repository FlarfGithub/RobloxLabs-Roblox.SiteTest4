using System;
using System.Collections.Generic;
using Roblox;
using Roblox.Caching;
using Roblox.Common;
using Roblox.Data.Interfaces;

namespace Roblox.Data.Counters
{
    internal class Sequence : IRobloxEntity<int, SequenceDAL>
    {
        private SequenceDAL _EntityDAL;

        public int ID
        { 
            get { return _EntityDAL.ID; }
        }

		public string Name
        {
            get { return _EntityDAL._Name; }
        }

		 public DateTime Created
        {
            get { return _EntityDAL._Created; }
        }

		 public DateTime Updated
        {
            get { return _EntityDAL._Updated; }
        }

		 public string Context
        {
            get { return _EntityDAL._Context; }
        }

		 public string Action
        {
            get { return _EntityDAL._Action; }
        }

		 public double Value
        {
            get { return _EntityDAL._Value; }
        }

		 public bool IsV2Sequence
        {
            get { return __EntityDAL.IsV2Sequence; }
        }

        public Sequence()
        {
            _EntityDAL = new SequenceDAL();
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
        
        private static Sequence CreateNew(string name, string context, string action, string context, double value, bool isV2Sequence = false)
        {
            var entity = new Sequence();
            entity.Name = name;
			entity.Action = action;
			entity.Context = context;
			entity.Value = value;
			entity.IsV2Sequence = isV2Sequence;
            entity.Save();

            return entity;
        }
        internal static Sequence Get(int id)
        {
            return EntityHelper.GetEntity<int, SequenceDAL, Sequence>(
                EntityCacheInfo,
                id,
                () => SequenceDAL.Get(id)
            );
        }

        internal static ICollection<Sequence> GetSequencesByName(string Name)
        {
            string collectionId = string.Format("GetSequencesByName_Name:{0}", Name);
            return EntityHelper.GetEntityCollection<Sequence, int>(
                EntityCacheInfo,
                new CacheManager.CachePolicy(
                    CacheManager.CacheScopeFilter.Qualified,
                    string.Format("Name:{0}", Name)
                ),
                collectionId,
                () => SequenceDAL.GetSequenceIDsByName(Name),
                Get
            );
        }

		internal static ICollection<Sequence> GetSequencesByAction(string Action)
        {
            string collectionId = string.Format("GetSequencesByAction_Action:{0}", Action);
            return EntityHelper.GetEntityCollection<Sequence, int>(
                EntityCacheInfo,
                new CacheManager.CachePolicy(
                    CacheManager.CacheScopeFilter.Qualified,
                    string.Format("Action:{0}", Action)
                ),
                collectionId,
                () => SequenceDAL.GetSequenceIDsByAction(Action),
                Get
            );
        }

		internal static ICollection<Sequence> GetSequencesByContext(string Context)
        {
            string collectionId = string.Format("GetSequencesByContext_Context:{0}", Context);
            return EntityHelper.GetEntityCollection<Sequence, int>(
                EntityCacheInfo,
                new CacheManager.CachePolicy(
                    CacheManager.CacheScopeFilter.Qualified,
                    string.Format("Context:{0}", Context)
                ),
                collectionId,
                () => SequenceDAL.GetSequenceIDsByContext(Context),
                Get
            );
        }

		internal static ICollection<Sequence> GetSequencesByIsV2Sequence(bool IsV2Sequence)
        {
            string collectionId = string.Format("GetSequencesByIsV2Sequence_IsV2Sequence:{0}", IsV2Sequence);
            return EntityHelper.GetEntityCollection<Sequence, int>(
                EntityCacheInfo,
                new CacheManager.CachePolicy(
                    CacheManager.CacheScopeFilter.Qualified,
                    string.Format("IsV2Sequence:{0}", IsV2Sequence)
                ),
                collectionId,
                () => SequenceDAL.GetSequenceIDsByIsV2Sequence(IsV2Sequence),
                Get
            );
        }

		/* Cut method for fetch all Sequences */

        public void Construct(SequenceDAL dal)
        {
            _EntityDAL = dal;
        }

		/* Cut Caching, IDLookup, NullLookups etc from here. */

    }
}