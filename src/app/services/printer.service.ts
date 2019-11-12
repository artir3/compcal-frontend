import { Injectable } from '@angular/core';
import { KpirFilter } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  constructor(private http: HttpClient) {
  }

  getKpirAllResponse(filter: KpirFilter) {
    return this.http.post<Response>(environment.apiUrl + "/printer/kpirs", filter);
  }

  getKpirAllBlob(filter: KpirFilter) {
    console.log(filter)
    const httpOptions = {
      'responseType': 'blob' as 'json'
    };
    return this.http.post<any>(environment.apiUrl + "/printer/kpir", filter, httpOptions);
  }

  sendKpirAllViaMail(filter: KpirFilter) {
    return this.http.post<void>(environment.apiUrl + "/printer/mail/kpir", filter);
  }
  
}