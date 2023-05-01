import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  results: any[];
  cached: boolean;

  constructor(private dataService: DataService) {}

  onResults(results: any[]) {
    this.results = results;
  }

  onCached(cached: boolean) {
    this.cached = cached;
  }
}
