import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserRegister, ActivateModel } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  get() {
    return this.http.get<User>(environment.apiUrl + `/user/`);
  }

  registration(user: UserRegister) {
    return this.http.post<Boolean>(environment.apiUrl + `/user/registration`, user);
  }

  update(user: User) {
    return this.http.put<Boolean>(environment.apiUrl + `/user/`, user);
  }

  authorize(activateModel: ActivateModel) {
    return this.http.post<Boolean>(environment.apiUrl + `/user/authorize`, activateModel);
  }

  deleteAccount(id: number) {
    return this.http.delete<Boolean>(environment.apiUrl + `/account/` + id);
  }

  getRegistrationDate() {
    return this.http.get<string>(environment.apiUrl + `/user/registration/date`);
  }


}
