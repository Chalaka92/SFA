import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@app/_models/order';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(`${environment.apiUrl}/order`);
  }

  getSingleOrder(id: number) {
    return this.http.get<Order>(`${environment.apiUrl}/order/` + id);
  }

  createOrder(request: Order) {
    return this.http.post(`${environment.apiUrl}/order`, request);
  }

  updateOrder(id: number, request: Order) {
    return this.http.put<Order[]>(`${environment.apiUrl}/order/` + id, request);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${environment.apiUrl}/order/` + id);
  }
}
