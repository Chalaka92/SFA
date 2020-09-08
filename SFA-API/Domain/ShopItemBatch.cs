namespace Domain
{
    public class ShopItemBatch
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public int ItemBatchId { get; set; }
        public int ItemCount { get; set; }
        public virtual Shop Shop { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
    }
}