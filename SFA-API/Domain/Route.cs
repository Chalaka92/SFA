using System.Collections.Generic;

namespace Domain
{
    public class Route
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public int StoreCount { get; set; }
        public string Name { get; set; }
        public string RouteCode { get; set; }
        public decimal StartLatitude { get; set; }
        public decimal StartLongitude { get; set; }
        public decimal EndLatitude { get; set; }
        public decimal EndLongitude { get; set; }
        public string Comment { get; set; }
        public virtual Area Area { get; set; }
        public virtual ICollection<Shop> Shops { get; set; }
        public virtual ICollection<Store> Stores { get; set; }
    }
}