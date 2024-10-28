import { Routes } from '@angular/router';
import { MapHomeComponent } from './map-home/map-home.component';

export const routes: Routes = [
  { path: 'map', component: MapHomeComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
];
