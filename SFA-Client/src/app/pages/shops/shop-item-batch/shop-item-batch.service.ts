import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopItemBatch } from '@app/_models/shopItemBatch';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopItemBatchService {
  constructor(private http: HttpClient) {}

  getAllShopItemBatches(): Observable<ShopItemBatch[]> {
    return this.http.get<ShopItemBatch[]>(
      `${environment.apiUrl}/shopItemBatch`
    );
  }

  createShopItemBatch(request: ShopItemBatch) {
    return this.http.post(`${environment.apiUrl}/shopItemBatch`, request);
  }

  updateShopItemBatch(id: number, request: ShopItemBatch) {
    return this.http.put<ShopItemBatch[]>(
      `${environment.apiUrl}/shopItemBatch/` + id,
      request
    );
  }

  deleteShopItemBatch(id: number) {
    return this.http.delete(`${environment.apiUrl}/shopItemBatch/` + id);
  }
}
