import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@app/_models/item';
import { ItemBatch } from '@app/_models/itemBatch';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemBatchService {
  constructor(private http: HttpClient) {}

  getAllItemBatches(): Observable<ItemBatch[]> {
    return this.http.get<ItemBatch[]>(`${environment.apiUrl}/itemBatch`);
  }

  createItemBatch(request: ItemBatch) {
    return this.http.post(`${environment.apiUrl}/itemBatch`, request);
  }

  updateItemBatch(id: number, request: ItemBatch) {
    return this.http.put<ItemBatch[]>(
      `${environment.apiUrl}/itemBatch/` + id,
      request
    );
  }

  deleteItemBatch(id: number) {
    return this.http.delete(`${environment.apiUrl}/itemBatch/` + id);
  }
}
