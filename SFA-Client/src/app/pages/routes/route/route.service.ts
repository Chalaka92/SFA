import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@app/_models/route';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private http: HttpClient) {}

  getAllRoutes() {
    return this.http.get<Route[]>(`${environment.apiUrl}/route`);
  }

  createRoute(request: Route) {
    return this.http.post(`${environment.apiUrl}/route`, request);
  }

  updateRoute(id: number, request: Route) {
    return this.http.put<Route[]>(`${environment.apiUrl}/route/` + id, request);
  }

  deleteRoute(id: number) {
    return this.http.delete(`${environment.apiUrl}/route/` + id);
  }
}
