import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy{
  constructor(private http: HttpClient, private router: Router) {
  }
  login(username: string, password: string) {
    let value: string = window.btoa(username + ':' + password);
    return this.http.post<Boolean>(environment.apiUrl + `/user/login`, { email: username, password: password})

    // const _headers = new HttpHeaders({
    //   Authorization: 'Basic ' + value,
    // });
    // const options = { headers: _headers }
    // return this.http.get<Boolean>(environment.apiUrl + `/user/login/hash`, options)
      .pipe(map(user => {
        if (user) {
          let authdata = window.btoa(username + ':' + password);
          sessionStorage.setItem('currentUser', JSON.stringify(authdata));
        }
        return user;
      }));
  }

  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl("/login");
  }

  isLogged() {
    let logged = sessionStorage.getItem("currentUser");
    return logged;
  }

  ngOnDestroy(): void {
    sessionStorage.clear()
  }
}
