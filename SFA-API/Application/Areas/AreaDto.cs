using System.Collections.Generic;
using Domain;

namespace Application.Areas
{
    public class AreaDto
    {
        public int Id { get; set; }
        public int DistrictId { get; set; }
        public string Name { get; set; }
        public string AreaCode { get; set; }
        public virtual ICollection<Route> Routes { get; set; }
    }
}