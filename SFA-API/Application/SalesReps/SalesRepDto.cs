using System.Collections.Generic;
using Application.Routes;

namespace Application.SalesReps
{
    public class SalesRepDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string SalesRepCode { get; set; }
        public int AssignedAreaId { get; set; }
        public string AssignedAreaName { get; set; }
        public int AssignedStoreId { get; set; }
        public string AssignedStoreName { get; set; }
    }
}