namespace Domain
{
    public class ShopContact
    {
        public int Id { get; set; }
        public string ContactNo { get; set; }
        public int ShopId { get; set; }
        public virtual Shop Shop { get; set; }
    }
}