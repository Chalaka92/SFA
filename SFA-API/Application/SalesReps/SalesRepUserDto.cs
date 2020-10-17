using System.Collections.Generic;
using Application.Routes;

namespace Application.SalesReps
{
    public class SalesRepUserDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public virtual ICollection<SalesRepDto> SalesRepDtos { get; set; }
    }
}