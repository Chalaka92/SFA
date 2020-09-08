namespace Domain
{
    public class FreeIssue
    {
        public int Id { get; set; }
        public string FreeIssueCode { get; set; }
        public int ExtraQuantity { get; set; }
        public int MinimumQuantity { get; set; }
        public bool IsCustomer { get; set; }
        public bool IsShopOwner { get; set; }
    }
}