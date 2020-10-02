using System;
using System.Collections.Generic;

namespace Application.Shops
{
    public class ShopDto
    {
        public int Id { get; set; }
        public int ShopOwnerId { get; set; }
        public int StatusId { get; set; }
        public int ShopCategoryId { get; set; }
        public int RouteId { get; set; }
        public string ShopCode { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string RouteName { get; set; }
        public string ShopOwnerName { get; set; }
        public string ShopCategoryName { get; set; }
        public string DisplayAddress { get; set; }
        public decimal ArrearsAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public virtual ICollection<ShopAddressDto> ShopAddresses { get; set; }
        public virtual ICollection<ShopEmailDto> ShopEmails { get; set; }
        public virtual ICollection<ShopContactDto> ShopContacts { get; set; }
    }
}