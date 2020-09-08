using System;
using System.Collections.Generic;

namespace Domain
{
    public class Store
    {
        public int Id { get; set; }
        public int StoreManagerId { get; set; }
        public int RouteId { get; set; }
        public string StoreCode { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public virtual ICollection<StoreAddress> StoreAddresses { get; set; }
        public virtual ICollection<StoreEmail> StoreEmails { get; set; }
        public virtual ICollection<StoreContact> StoreContacts { get; set; }
        public virtual UserDetail UserDetail { get; set; }
        public virtual Route Route { get; set; }
        public virtual ICollection<StoreItemBatch> StoreItemBatches { get; set; }
    }
}