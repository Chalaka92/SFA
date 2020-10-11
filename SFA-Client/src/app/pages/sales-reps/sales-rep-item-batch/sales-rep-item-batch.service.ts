import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesRepItemBatch } from '@app/_models/salesRepItemBatch';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesRepItemBatchService {
  constructor(private http: HttpClient) {}

  getAllSalesRepItemBatches() {
    return this.http.get<SalesRepItemBatch[]>(
      `${environment.apiUrl}/salesRepItemBatch`
    );
  }

  getAllSalesRepItemBatchesBySalesRepId(salesRepId: number) {
    return this.http.get<SalesRepItemBatch[]>(
      `${environment.apiUrl}/salesRepItemBatch/ListBySalesRepId/` + salesRepId
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
