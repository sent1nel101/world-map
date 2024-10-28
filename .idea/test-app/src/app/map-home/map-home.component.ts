import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';

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
  fetchedData: any;

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
    fetch(this.url)
      .then((response) => response.json())
      .then((results) => results[1][0].iso2Code);
  }

  onCountryClick(target: any): void {
    // Handle the click event, e.g., display data for the clicked country
    this.countryName.nativeElement.innerText = `${target.attributes.name.nodeValue}`;
    this.url = `https://api.worldbank.org/v2/country/${target.id}?format=json`;

    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        this.fetchedData = data[1][0];
        // Use fetchedData here
        console.log(this.fetchedData);
        this.spanCap.nativeElement.innerText = this.fetchedData.capitalCity;
        this.spanReg.nativeElement.innerText = this.fetchedData.region.value;
        this.spanInc.nativeElement.innerText =
          this.fetchedData.incomeLevel.value;
        this.spanPop.nativeElement.innerText = this.fetchedData.lendingType.id;
        this.spanLat.nativeElement.innerText = this.fetchedData.latitude;
        this.spanLong.nativeElement.innerText = this.fetchedData.longitude;
      });
  }
}
