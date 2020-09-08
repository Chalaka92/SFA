using System;
using System.Collections.Generic;
using Application.Routes;

namespace Application.StoreItemBatches
{
    public class StoreItemBatchDto
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public int ItemBatchId { get; set; }
        public int ItemCount { get; set; }
    }
}