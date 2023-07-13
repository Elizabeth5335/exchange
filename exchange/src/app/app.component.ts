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
    this.http.get<any>('https://v6.exchangerate-api.com/v6/66dfbed4d59b2adb14ba3230/latest/USD').subscribe(
      (response) => {
        this.usd = response.conversion_rates.UAH;
      },
      (error) => {
        console.error(error);
      }
    );

    this.http.get<any>('https://v6.exchangerate-api.com/v6/66dfbed4d59b2adb14ba3230/latest/EUR').subscribe(
      (response) => {
        this.eur = response.conversion_rates.UAH;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
