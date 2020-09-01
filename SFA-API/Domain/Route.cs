namespace Domain
{
    public class Route
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public int StoreCount { get; set; }
        public string Name { get; set; }
        public string RouteCode { get; set; }
        public string StartLatitude { get; set; }
        public string Startlongitude { get; set; }
        public string EndLatitude { get; set; }
        public string Endlongitude { get; set; }
        public string Comment { get; set; }
        public virtual Area Area { get; set; }
    }
}