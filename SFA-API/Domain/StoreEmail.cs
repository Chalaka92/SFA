namespace Domain
{
    public class StoreEmail
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int StoreId { get; set; }
        public virtual Store Store { get; set; }
    }
}