import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@app/_models/store';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getAllStores() {
    return this.http.get<Store[]>(`${environment.apiUrl}/store`);
  }

  getSingleStore(id: number) {
    return this.http.get<Store>(`${environment.apiUrl}/store/` + id);
  }

  createStore(request: Store) {
    return this.http.post(`${environment.apiUrl}/store`, request);
  }

  updateStore(id: number, request: Store) {
    return this.http.put<Store[]>(`${environment.apiUrl}/store/` + id, request);
  }

  deleteStore(id: number) {
    return this.http.delete(`${environment.apiUrl}/store/` + id);
  }
}
