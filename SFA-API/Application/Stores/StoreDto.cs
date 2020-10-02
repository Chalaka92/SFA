using System;
using System.Collections.Generic;

namespace Application.Stores
{
    public class StoreDto
    {
        public int Id { get; set; }
        public int StoreManagerId { get; set; }
        public int RouteId { get; set; }
        public string StoreCode { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string StoreManagerName { get; set; }
        public string RouteName { get; set; }
        public string DisplayAddress { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public virtual ICollection<StoreAddressDto> StoreAddresses { get; set; }
        public virtual ICollection<StoreEmailDto> StoreEmails { get; set; }
        public virtual ICollection<StoreContactDto> StoreContacts { get; set; }
    }
}