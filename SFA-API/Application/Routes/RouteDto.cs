namespace Application.Routes
{
    public class RouteDto
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public int DistrictId { get; set; }
        public int ProvinceId { get; set; }
        public int StoreCount { get; set; }
        public string Name { get; set; }
        public string RouteCode { get; set; }
        public decimal StartLatitude { get; set; }
        public decimal StartLongitude { get; set; }
        public decimal EndLatitude { get; set; }
        public decimal EndLongitude { get; set; }
        public string Comment { get; set; }
        public string AreaName { get; set; }
    }
}