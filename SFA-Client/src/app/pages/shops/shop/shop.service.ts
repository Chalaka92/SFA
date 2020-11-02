import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '@app/_models/shop';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${environment.apiUrl}/shop`);
  }

  getSingleShop(id: number): Observable<Shop> {
    return this.http.get<Shop>(`${environment.apiUrl}/shop/` + id);
  }

  createShop(request: Shop) {
    return this.http.post(`${environment.apiUrl}/shop`, request);
  }

  updateShop(id: number, request: Shop) {
    return this.http.put<Shop[]>(`${environment.apiUrl}/shop/` + id, request);
  }

  deleteShop(id: number) {
    return this.http.delete(`${environment.apiUrl}/shop/` + id);
  }
}
