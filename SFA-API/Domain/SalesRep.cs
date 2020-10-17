using System.Collections.Generic;

namespace Domain
{
    public class SalesRep
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SalesRepCode { get; set; }
        public int AssignedAreaId { get; set; }
        public int AssignedStoreId { get; set; }
        public virtual UserDetail UserDetail { get; set; }
    }
}