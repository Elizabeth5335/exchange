import { Component } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

  

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})



export class ConvertComponent {

  constructor(private http: HttpClient) { }

  curr1 = new FormControl('USD');
  curr2 = new FormControl('UAH');
  val1 = new FormControl('1');
  val2 = new FormControl('');
  

  rate = '';


  getRate(curr1: string | null, curr2: string | null): string {
    const url = `https://v6.exchangerate-api.com/v6/da14864407c36d688f8b4427/latest/${curr1}`;
  
    this.http.get<any>(url).subscribe(
      (response) => {
        switch (curr1) {
          case 'USD':
            switch (curr2) {
              case 'UAH':
                this.rate = response.conversion_rates.UAH;
                break;
              case 'EUR':
                this.rate = response.conversion_rates.EUR;
                break;
              case 'PLN':
                this.rate = response.conversion_rates.PLN;
                break;
              default:
                this.rate = '1';
                break;
            }
            break;
          case 'EUR':
            switch (curr2) {
              case 'UAH':
                this.rate = response.conversion_rates.UAH;
                break;
              case 'USD':
                this.rate = response.conversion_rates.USD;
                break;
              case 'PLN':
                this.rate = response.conversion_rates.PLN;
                break;
              default:
                this.rate = '1';
                break;
            }
            break;
          case 'PLN':
            switch (curr2) {
              case 'UAH':
                this.rate = response.conversion_rates.UAH;
                break;
              case 'EUR':
                this.rate = response.conversion_rates.EUR;
                break;
              case 'USD':
                this.rate = response.conversion_rates.USD;
                break;
              default:
                this.rate = '1';
                break;
            }
            break;
          case 'UAH': 
            switch (curr2) {
              case 'USD':
                this.rate = response.conversion_rates.USD;
                break;
              case 'EUR':
                this.rate = response.conversion_rates.EUR;
                break;
              case 'PLN':
                this.rate = response.conversion_rates.PLN;
                break;
              default:
                this.rate = '1';
                break;
            }
            break;
          default:
            this.rate = response.conversion_rates.USD;
            break;
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return this.rate;
    
  }
  
  convert(value: any, curr1: any, curr2: any, rate: string): number {
    return parseFloat(value)*parseFloat(rate);
  }
    

  onCurrencyChange(valToChange : any, value: any, curr1: any, curr2: any): void {
    this.rate = this.getRate(curr1, curr2);
    if (value && curr1 && curr2) {
      const convertedValue = this.convert(value.value, curr1.value, curr2.value, this.rate);
      valToChange.setValue(convertedValue.toString());
    }
  }

  onInputChange(valToChange : any, value: any, curr1: any, curr2: any): void {
    if (value && curr1 && curr2) {
      const convertedValue = this.convert(value.value, curr1.value, curr2.value, this.rate);
      valToChange.setValue(convertedValue.toString());
    }
  }

  
  ngOnInit(){   
    // this.onCurrencyChange(this.val2, '1', this.curr1, this.curr2.value);
    this.http.get<any>('https://v6.exchangerate-api.com/v6/da14864407c36d688f8b4427/latest/USD').subscribe(
      (response) => {
        this.val2 = new FormControl(response.conversion_rates.UAH);
      },
      (error) => {
        console.error(error);
      }
    );
    this.rate = this.getRate(this.curr1.value,this.curr2.value); 
  }
  
}

