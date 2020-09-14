using System.Collections.Generic;
using Application.Areas;

namespace Application.Districts
{
    public class DistrictDto
    {
        public int Id { get; set; }
        public int ProvinceId { get; set; }
        public string Name { get; set; }
        public string ProvinceName { get; set; }
        public virtual ICollection<AreaDto> Areas { get; set; }
    }
}