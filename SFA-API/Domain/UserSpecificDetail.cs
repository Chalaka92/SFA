using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UserSpecificDetail
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int AssignedAreaId { get; set; }
        public int AssignedRouteId { get; set; }
        public int AssignedStoreId { get; set; }
        public string AssignedDays { get; set; }
    }
}
