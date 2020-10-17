namespace Application.SalesRepItemBatches
{
    public class SalesRepItemBatchDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SalesRepName { get; set; }
        public int ItemBatchId { get; set; }
        public string ItemBatchName { get; set; }
        public int ItemCount { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
    }
}