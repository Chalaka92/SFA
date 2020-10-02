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
import { StoresService } from '@app/pages/stores/stores.service';
import { ItemCategoryService } from '@app/pages/Items/item-category/item-category.service';
import { ItemService } from '@app/pages/Items/item/item.service';
import { ItemBatchService } from '@app/pages/Items/item-batch/item-batch.service';
import { SalesRepsService } from '@app/pages/sales-reps/sales-reps.service';

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
  _storeService: StoresService;
  _itemBatchService: ItemBatchService;
  _salesRepService: SalesRepsService;

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
    private storeService: StoresService,
    private itemBatchService: ItemBatchService,
    private salesRepService: SalesRepsService
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
  }

  getAllRoles() {
    return this.http.get<Role[]>(`${environment.apiUrl}/user/getuserroles`);
  }
}
