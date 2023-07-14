import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { ConvertComponent } from './convert/convert.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
