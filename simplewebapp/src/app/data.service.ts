import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = "http://localhost:3000/weather"
  constructor(private http: HttpClient) { }

  getData(days: {info: any[], cache: boolean}) {
    return this.http.post(this.url, {days: days});
  }
}
