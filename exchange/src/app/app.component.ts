import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConvertComponent } from './convert/convert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usd: string = '';
  eur: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(){
  }
}
