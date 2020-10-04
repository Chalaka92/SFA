namespace Application.ShopItemBatches
{
    public class ShopItemBatchDto
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public int ItemBatchId { get; set; }
        public string ItemBatchName { get; set; }
        public int ItemCount { get; set; }
    }
}