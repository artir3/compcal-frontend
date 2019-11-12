import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractorMini, Contractor, ContractorFilter, ContractorSelect } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  constructor(private http: HttpClient) {
  }

  getAll(filter: ContractorFilter) {
    return this.http.post<ContractorMini[]>(environment.apiUrl + `/contractor`, filter);
  }

  getOne(id: number) {
    return this.http.get<Contractor>(environment.apiUrl + `/contractor/` + id);
  }

  create(contractor: Contractor) {
    return this.http.post<Boolean>(environment.apiUrl + `/contractor/`, contractor);
  }

  update(contractor: Contractor) {
    return this.http.put<Boolean>(environment.apiUrl + `/contractor/`, contractor);
  }

  delete(id: number) {
    return this.http.delete<Boolean>(environment.apiUrl + `/contractor/` + id);
  }

  getAllSelect() {
    return this.http.get<ContractorSelect[]>(environment.apiUrl + `/contractor`);
  }
}
