namespace Domain
{
    public class ShopAddress
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public decimal LocationLatitude { get; set; }
        public decimal LocationLongitude { get; set; }
        public virtual Shop Shop { get; set; }

    }
}