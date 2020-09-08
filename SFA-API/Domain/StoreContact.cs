namespace Domain
{
    public class StoreContact
    {
        public int Id { get; set; }
        public string ContactNo { get; set; }
        public int StoreId { get; set; }
        public virtual Store Store { get; set; }
    }
}