import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectService {
  constructor(private http: HttpClient) {}
  @ViewChild('countryName')
  countryName!: ElementRef;
  @ViewChild('spanCap')
  spanCap!: ElementRef;
  @ViewChild('spanReg')
  spanReg!: ElementRef;
  @ViewChild('spanInc')
  spanInc!: ElementRef;
  @ViewChild('spanPop')
  spanPop!: ElementRef;
  @ViewChild('spanLat')
  spanLat!: ElementRef;
  @ViewChild('spanLong')
  spanLong!: ElementRef;
  data: any;
  private url: string = ``;
  fetchedData: any;
  getData() {
    this.http.get<any>(this.url).subscribe((data) => {
      this.fetchedData = data[1][0];
      // Use fetchedData here
      console.log(this.fetchedData);
      this.spanCap.nativeElement.innerText = this.fetchedData.capitalCity;
      this.spanReg.nativeElement.innerText = this.fetchedData.region.value;
      this.spanInc.nativeElement.innerText = this.fetchedData.incomeLevel.value;
      this.spanPop.nativeElement.innerText = this.fetchedData.lendingType.id;
      this.spanLat.nativeElement.innerText = this.fetchedData.latitude;
      this.spanLong.nativeElement.innerText = this.fetchedData.longitude;
    });
  }
}
