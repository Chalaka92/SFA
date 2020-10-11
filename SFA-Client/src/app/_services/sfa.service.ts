import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '@app/_models/role';
import { environment } from '@environments/environment';
import { ProvinceService } from '@app/pages/routes/province/province.service';
import { DistrictService } from '@app/pages/routes/district/district.service';
import { AreaService } from '@app/pages/routes/area/area.service';
import { RouteService } from '@app/pages/routes/route/route.service';
import { UsersService } from '@app/pages/users/users.service';
import { ShopService } from '@app/pages/shops/shop/shop.service';
import { ShopCategoryService } from '@app/pages/shops/shop-category/shop-category.service';
import { StatusService } from '@app/pages/statuses/status/status.service';
import { StatusTypeService } from '@app/pages/statuses/status-type/status-type.service';
import { ItemCategoryService } from '@app/pages/Items/item-category/item-category.service';
import { ItemService } from '@app/pages/Items/item/item.service';
import { ItemBatchService } from '@app/pages/Items/item-batch/item-batch.service';
import { SalesRepService } from '@app/pages/sales-reps/sales-rep/sales-rep.service';
import { StoreService } from '@app/pages/stores/store/store.service';
import { StoreItemBatchService } from '@app/pages/stores/store-item-batch/store-item-batch.service';
import { ShopItemBatchService } from '@app/pages/shops/shop-item-batch/shop-item-batch.service';
import { SalesRepItemBatchService } from '@app/pages/sales-reps/sales-rep-item-batch/sales-rep-item-batch.service';
import { OrderItemBatchService } from '@app/pages/orders/order-item-batch/order-item-batch.service';
import { OrderService } from '@app/pages/orders/order/order.service';

@Injectable({ providedIn: 'root' })
export class SfaService {
  _provinceService: ProvinceService;
  _districtService: DistrictService;
  _areaService: AreaService;
  _routeService: RouteService;
  _userService: UsersService;
  _shopService: ShopService;
  _shopCategoryService: ShopCategoryService;
  _itemCategoryService: ItemCategoryService;
  _itemService: ItemService;
  _statusService: StatusService;
  _statusTypeService: StatusTypeService;
  _storeService: StoreService;
  _itemBatchService: ItemBatchService;
  _salesRepService: SalesRepService;
  _storeItemBatchService: StoreItemBatchService;
  _shopItemBatchService: ShopItemBatchService;
  _salesRepItemBatchService: SalesRepItemBatchService;
  _orderItemBatchService: OrderItemBatchService;
  _orderService: OrderService;

  constructor(
    private http: HttpClient,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private areaService: AreaService,
    private routeService: RouteService,
    private userService: UsersService,
    private shopService: ShopService,
    private shopCategoryService: ShopCategoryService,
    private itemCategoryService: ItemCategoryService,
    private itemService: ItemService,
    private statusService: StatusService,
    private statusTypeService: StatusTypeService,
    private storeService: StoreService,
    private itemBatchService: ItemBatchService,
    private salesRepService: SalesRepService,
    private orderService: OrderService,
    private storeItemBatchService: StoreItemBatchService,
    private shopItemBatchService: ShopItemBatchService,
    private salesRepItemBatchService: SalesRepItemBatchService,
    private orderItemBatchService: OrderItemBatchService
  ) {
    this._provinceService = provinceService;
    this._districtService = districtService;
    this._areaService = areaService;
    this._routeService = routeService;
    this._userService = userService;
    this._shopService = shopService;
    this._shopCategoryService = shopCategoryService;
    this._itemCategoryService = itemCategoryService;
    this._itemService = itemService;
    this._statusService = statusService;
    this._statusTypeService = statusTypeService;
    this._storeService = storeService;
    this._itemBatchService = itemBatchService;
    this._salesRepService = salesRepService;
    this._orderService = orderService;
    this._storeItemBatchService = storeItemBatchService;
    this._shopItemBatchService = shopItemBatchService;
    this._salesRepItemBatchService = salesRepItemBatchService;
    this._orderItemBatchService = orderItemBatchService;
  }

  getAllRoles() {
    return this.http.get<Role[]>(`${environment.apiUrl}/user/getuserroles`);
  }
}
