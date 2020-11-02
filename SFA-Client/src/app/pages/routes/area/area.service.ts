import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '@app/_models/area';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private http: HttpClient) {}

  getAllAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${environment.apiUrl}/area`);
  }

  createArea(request: Area) {
    return this.http.post(`${environment.apiUrl}/area`, request);
  }

  updateArea(id: number, request: Area) {
    return this.http.put<Area[]>(`${environment.apiUrl}/area/` + id, request);
  }

  deleteArea(id: number) {
    return this.http.delete(`${environment.apiUrl}/area/` + id);
  }
}
