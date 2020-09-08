namespace Domain
{
    public class StoreAddress
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public string LocationLatitude { get; set; }
        public string LocationLongitude { get; set; }
        public virtual Store Store { get; set; }
    }
}