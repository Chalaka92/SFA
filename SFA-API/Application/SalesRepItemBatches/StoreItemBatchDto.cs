namespace Application.SalesRepItemBatches
{
    public class SalesRepItemBatchDto
    {
        public int Id { get; set; }
        public int SalesRepId { get; set; }
        public int ItemBatchId { get; set; }
        public int ItemCount { get; set; }
    }
}