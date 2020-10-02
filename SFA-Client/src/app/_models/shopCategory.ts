export class ShopCategory {
  id: number;
  name: string;
  description: string;
  shopCategoryCode: string;
  maximumDebtAmount: number;

  constructor(shopCategory) {
    this.id = shopCategory.id;
    this.name = shopCategory.name;
    this.description = shopCategory.description;
    this.shopCategoryCode = shopCategory.shopCategoryCode;
    this.maximumDebtAmount = shopCategory.maximumDebtAmount;
  }
}
