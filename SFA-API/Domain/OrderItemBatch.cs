namespace Domain
{
    public class OrderItemBatch
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ItemBatchId { get; set; }
        public string OrderItemBatchCode { get; set; }
        public string Name { get; set; }
        public int ItemCount { get; set; }
        public decimal SellingToShopOwnerAmount { get; set; }
        public decimal ShopOwnerProfitAmount { get; set; }
        public decimal CompanyProfitAmount { get; set; }
        public decimal CompanyDiscountRate { get; set; }
        public decimal ShopOwnerDiscountRate { get; set; }
        public bool IsSpecialDiscountHave { get; set; }
        public int CustomerFreeIssueQuantity { get; set; }
        public int ShopOwnerFreeIssueQuantity { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
        public virtual Order Order { get; set; }
    }
}