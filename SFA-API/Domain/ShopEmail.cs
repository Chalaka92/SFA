namespace Domain
{
    public class ShopEmail
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int ShopId { get; set; }
        public virtual Shop Shop { get; set; }
    }
}