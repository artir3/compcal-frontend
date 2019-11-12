import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kpir, KpirFilter } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KpirService {
  public kpirId: number;

  constructor(private http: HttpClient) {
  }

  getAll(filter: KpirFilter) {
    return this.http.post<Kpir[]>(environment.apiUrl + `/kpir`, filter);
  }

  getOne(id: number) {
    return this.http.get<Kpir>(environment.apiUrl + `/kpir/` + id);
  }

  create(kpir: Kpir) {
    return this.http.post<Boolean>(environment.apiUrl + `/kpir/`, kpir);
  }

  update(kpir: Kpir) {
    return this.http.put<Boolean>(environment.apiUrl + `/kpir/`, kpir);
  }

  delete(id: number) {
    return this.http.delete<Boolean>(environment.apiUrl + `/kpir/` + id);
  }

  getNextIdx() {
    return this.http.get<Number>(environment.apiUrl + "/kpir/idx")
  }
}
