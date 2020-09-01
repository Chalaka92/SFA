using System.Collections.Generic;

namespace Domain
{
    public class Area
    {
        public int Id { get; set; }
        public int DistrictId { get; set; }
        public string Name { get; set; }
        public string AreaCode { get; set; }
        public virtual District District { get; set; }
        public virtual ICollection<Route> Routes { get; set; }
    }
}