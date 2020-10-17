using System.Collections.Generic;

namespace Domain
{
    public class SalesRepItemBatch
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ItemBatchId { get; set; }
        public int ItemCount { get; set; }
        public int StoreId { get; set; }
        public virtual UserDetail UserDetail { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
    }
}