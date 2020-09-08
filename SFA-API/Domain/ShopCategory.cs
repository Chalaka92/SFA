using System.Collections.Generic;

namespace Domain
{
    public class ShopCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShopCategoryCode { get; set; }
        public decimal MaximumDebtAmount { get; set; }
        public virtual List<Shop> Shops { get; set; }
    }
}