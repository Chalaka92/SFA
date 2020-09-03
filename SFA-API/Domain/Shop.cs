using System;
using System.Collections.Generic;

namespace Domain
{
    public class Shop
    {
        public int Id { get; set; }
        public int ShopOwnerId { get; set; }
        public int StatusId { get; set; }
        public int ShopCategoryId { get; set; }
        public int RouteId { get; set; }
        public string ShopCode { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public decimal ArrearsAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public virtual ICollection<ShopAddress> ShopAddresses { get; set; }
        public virtual ICollection<ShopEmail> ShopEmails { get; set; }
        public virtual ICollection<ShopContact> ShopContacts { get; set; }
    }
}