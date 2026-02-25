import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeData {
  private api = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  getemployee() {
    return this.http.get(this.api);
  }
}
