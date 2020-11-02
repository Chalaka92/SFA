import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopCategory } from '@app/_models/shopCategory';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopCategoryService {
  constructor(private http: HttpClient) {}

  getAllShopCategories(): Observable<ShopCategory[]> {
    return this.http.get<ShopCategory[]>(`${environment.apiUrl}/shopCategory`);
  }

  createShopCategory(request: ShopCategory) {
    return this.http.post(`${environment.apiUrl}/shopCategory`, request);
  }

  updateShopCategory(id: number, request: ShopCategory) {
    return this.http.put<ShopCategory[]>(
      `${environment.apiUrl}/shopCategory/` + id,
      request
    );
  }

  deleteShopCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}/shopCategory/` + id);
  }
}
