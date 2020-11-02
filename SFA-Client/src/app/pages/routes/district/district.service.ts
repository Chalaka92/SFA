import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { District } from '@app/_models/district';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private http: HttpClient) {}

  getAllDistricts(): Observable<District[]> {
    return this.http.get<District[]>(`${environment.apiUrl}/district`);
  }

  createDistrict(request: District) {
    return this.http.post(`${environment.apiUrl}/district`, request);
  }

  updateDistrict(id: number, request: District) {
    return this.http.put<District[]>(
      `${environment.apiUrl}/district/` + id,
      request
    );
  }

  deleteDistrict(id: number) {
    return this.http.delete(`${environment.apiUrl}/district/` + id);
  }
}
