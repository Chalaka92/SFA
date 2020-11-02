import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreItemBatch } from '@app/_models/storeItemBatch';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreItemBatchService {
  constructor(private http: HttpClient) {}

  getAllStoreItemBatches(): Observable<StoreItemBatch[]> {
    return this.http.get<StoreItemBatch[]>(
      `${environment.apiUrl}/storeItemBatch`
    );
  }

  getAllStoreItemBatchesByStoreId(storeId: any): Observable<StoreItemBatch[]> {
    return this.http.get<StoreItemBatch[]>(
      `${environment.apiUrl}/storeItemBatch/ListByStoreId/` + storeId
    );
  }

  getSingleStoreItemBatch(id: number): Observable<StoreItemBatch> {
    return this.http.get<StoreItemBatch>(
      `${environment.apiUrl}/storeItemBatch/` + id
    );
  }

  createStoreItemBatch(request: StoreItemBatch) {
    return this.http.post(`${environment.apiUrl}/storeItemBatch`, request);
  }

  updateStoreItemBatch(id: number, request: StoreItemBatch) {
    return this.http.put<StoreItemBatch[]>(
      `${environment.apiUrl}/storeItemBatch/` + id,
      request
    );
  }

  deleteStoreItemBatch(id: number) {
    return this.http.delete(`${environment.apiUrl}/storeItemBatch/` + id);
  }
}
