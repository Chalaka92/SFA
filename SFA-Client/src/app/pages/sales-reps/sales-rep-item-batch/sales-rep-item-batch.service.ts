import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesRepItemBatch } from '@app/_models/salesRepItemBatch';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesRepItemBatchService {
  constructor(private http: HttpClient) {}

  getAllSalesRepItemBatches(): Observable<SalesRepItemBatch[]> {
    return this.http.get<SalesRepItemBatch[]>(
      `${environment.apiUrl}/salesRepItemBatch`
    );
  }

  getAllSalesRepItemBatchesByUserId(
    userId: number
  ): Observable<SalesRepItemBatch[]> {
    return this.http.get<SalesRepItemBatch[]>(
      `${environment.apiUrl}/salesRepItemBatch/ListByUserId/` + userId
    );
  }

  createSalesRepItemBatch(request: SalesRepItemBatch) {
    return this.http.post(`${environment.apiUrl}/salesRepItemBatch`, request);
  }

  updateSalesRepItemBatch(id: number, request: SalesRepItemBatch) {
    return this.http.put<SalesRepItemBatch[]>(
      `${environment.apiUrl}/salesRepItemBatch/` + id,
      request
    );
  }

  deleteSalesRepItemBatch(id: number) {
    return this.http.delete(`${environment.apiUrl}/salesRepItemBatch/` + id);
  }
}
