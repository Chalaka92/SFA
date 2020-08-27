import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Value } from '@app/_models/value';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllValues() {
    return this.http.get<Value[]>(`${environment.apiUrl}/values`).subscribe();
  }
}
