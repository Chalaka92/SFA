using System.Collections.Generic;
using Application.Routes;

namespace Application.Items
{
    public class ItemDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string ItemCode { get; set; }
        public string Comment { get; set; }
        public bool IsNew { get; set; }
    }
}