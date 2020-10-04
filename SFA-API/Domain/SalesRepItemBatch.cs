using System.Collections.Generic;

namespace Domain
{
    public class SalesRepItemBatch
    {
        public int Id { get; set; }
        public int SalesRepId { get; set; }
        public int ItemBatchId { get; set; }
        public int ItemCount { get; set; }
        public int StoreId { get; set; }
        public virtual SalesRep SalesRep { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
    }
}