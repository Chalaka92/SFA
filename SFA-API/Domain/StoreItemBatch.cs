namespace Domain
{
    public class StoreItemBatch
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public int ItemBatchId { get; set; }
        public int ItemCount { get; set; }
        public virtual Store Store { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
    }
}