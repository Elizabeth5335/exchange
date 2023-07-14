import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { __values } from 'tslib';

  

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
  defVal = '0';
  rate = '';


  async getRate(curr1: string | null, curr2: string) {
    const url = `https://v6.exchangerate-api.com/v6/66dfbed4d59b2adb14ba3230/latest/${curr1}`;
  
    try {
      const response = await this.http.get<any>(url).toPromise();
      if (response.conversion_rates.hasOwnProperty(curr2)) {
        this.rate = response.conversion_rates[curr2];
        console.log('Updated rate:', this.rate);
      }
    } catch (error) {
      console.error(error);
    }
  }


  convert(value: any, curr1: any, curr2: any, rate: string): number {
    return parseFloat(value)*parseFloat(rate);
  }


  async onCurrencyChange(valueToChange: any, value: any, curr1: any, curr2: any): Promise<void> {
    if(value.value===null){
      value.setValue('0');
    }
    if(curr2.value){
      await this.getRate(curr1.value, curr2.value)
    }
    const convertedValue = this.convert(value.value, curr1.value, curr2.value, this.rate).toString();
    valueToChange.setValue(convertedValue);
  }


  async changeDefVal(){
    if(this.curr2.value){
      await this.getRate(this.curr1.value,this.curr2.value); 
    }
    this.defVal = this.rate;
  }


  async ngOnInit(){   
    this.http.get<any>('https://v6.exchangerate-api.com/v6/66dfbed4d59b2adb14ba3230/latest/USD').subscribe(
      (response) => {
        this.val2 = new FormControl(response.conversion_rates.UAH);
      },
      (error) => {
        console.error(error);
      }
    );
    if(this.curr2.value){
      await this.getRate(this.curr1.value,this.curr2.value); 
    }
    this.defVal = this.convert('1', this.curr1.value, this.curr2.value, this.rate).toString();
  }
  
}

