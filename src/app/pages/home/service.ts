import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Service {
  
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(environment.baseUrl + environment.endpoints.users);
  }
}
