import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Injectable,
} from '@angular/core';
import { ApiConnectService } from '../api-connect.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-map-home',
  standalone: true,
  imports: [],
  templateUrl: './map-home.component.html',
  styleUrl: './map-home.component.css',
})
export class MapHomeComponent implements AfterViewInit, OnInit {
  @ViewChild('svgObject')
  svgObject!: ElementRef;
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
  constructor(private apiService: ApiConnectService) {}

  ngAfterViewInit(): void {
    this.svgObject.nativeElement.addEventListener('load', () => {
      const svgDoc = this.svgObject.nativeElement.contentDocument;
      const paths = svgDoc.querySelectorAll('path');

      paths.forEach(
        (path: {
          addEventListener: (arg0: string, arg1: (event: any) => void) => void;
        }) => {
          path.addEventListener('click', (event) => {
            this.onCountryClick(event.target);
          });
        }
      );
    });
  }

  ngOnInit(): void {
    console.log('initialized');
  }

  onCountryClick(target: any): void {
    // Handle the click event
    this.url = `https://api.worldbank.org/v2/country/${target.id}?format=json`;
    this.apiService.getData(this.url);
    // display the fetched data in the HTML
    this.data = this.apiService.fetchedData;
    this.countryName.nativeElement.innerText = this.data.name;
    this.spanCap.nativeElement.innerText = this.data.capitalCity;
    this.spanReg.nativeElement.innerText = this.data.region.value;
    this.spanInc.nativeElement.innerText = this.data.incomeLevel.value;
    this.spanPop.nativeElement.innerText = this.data.lendingType.id;
    this.spanLat.nativeElement.innerText = this.data.latitude;
    this.spanLong.nativeElement.innerText = this.data.longitude;
  }
}
