using System.Collections.Generic;
using Domain;

namespace Application.Districts
{
    public class DistrictDto
    {
        public int Id { get; set; }
        public int ProvinceId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Area> Areas { get; set; }
    }
}