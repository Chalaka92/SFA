using System;

namespace Domain
{
    public class Target
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string TargetCode { get; set; }
        public int TimePeriod { get; set; }
        public DateTime TimeStartFrom { get; set; }
        public DateTime TimeEndTo { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
        public decimal CommisionAmount { get; set; }
        public decimal CommisionRate { get; set; }
        public virtual Item Item { get; set; }
    }
}