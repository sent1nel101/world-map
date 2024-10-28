import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectService {
  data: any;
  fetchedData: any;
  constructor(private http: HttpClient) {}

  getData(url: string) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.fetchedData = data[1][0];
        console.log(this.fetchedData);
        return this.fetchedData;
      });
  }
}
