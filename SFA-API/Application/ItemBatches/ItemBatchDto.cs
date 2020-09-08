using System;
using System.Collections.Generic;
using Application.Routes;

namespace Application.ItemBatches
{
    public class ItemBatchDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int ItemStatusId { get; set; }
        public int ItemCount { get; set; }
        public string ItemBatchCode { get; set; }
        public string Name { get; set; }
        public decimal MaxRetailPrice { get; set; }
        public DateTime ManufactureDate { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}