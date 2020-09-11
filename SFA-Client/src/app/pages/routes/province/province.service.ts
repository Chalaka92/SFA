import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Province } from '@app/_models/province';

@Injectable({ providedIn: 'root' })
export class ProvinceService {
  constructor(private http: HttpClient) {}

  getAllProvinces() {
    return this.http.get<Province[]>(`${environment.apiUrl}/province`);
  }

  createProvince(request: Province) {
    return this.http.post(`${environment.apiUrl}/province`, request);
  }

  updateProvince(id: number, request: Province) {
    return this.http.put<Province[]>(
      `${environment.apiUrl}/province/` + id,
      request
    );
  }

  deleteProvince(id: number) {
    return this.http.delete(`${environment.apiUrl}/province/` + id);
  }
}
