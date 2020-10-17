import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesRep } from '@app/_models/salesRep';
import { SalesRepGroupByUserId } from '@app/_models/salesRepGroupByUserId';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesRepService {
  constructor(private http: HttpClient) {}

  getAllSalesReps() {
    return this.http.get<SalesRep[]>(`${environment.apiUrl}/salesRep`);
  }

  getAllSalesRepsGroupByUserId() {
    return this.http.get<SalesRepGroupByUserId[]>(
      `${environment.apiUrl}/salesRep/GroupByUserId`
    );
  }

  getAllSalesRepsDetailsBySalesRepId(salesRepId: number) {
    return this.http.get<SalesRep[]>(
      `${environment.apiUrl}/salesRep/ListBySalesRepId/` + salesRepId
    );
  }

  getAllSalesRepsDetailsByUserId(userId: number) {
    return this.http.get<SalesRep[]>(
      `${environment.apiUrl}/salesRep/ListByUserId/` + userId
    );
  }

  createSalesRep(request: SalesRep) {
    return this.http.post(`${environment.apiUrl}/salesRep`, request);
  }

  updateSalesRep(id: number, request: SalesRep) {
    return this.http.put<SalesRep[]>(
      `${environment.apiUrl}/salesRep/` + id,
      request
    );
  }

  deleteSalesRep(id: number) {
    return this.http.delete(`${environment.apiUrl}/salesRep/` + id);
  }
}
