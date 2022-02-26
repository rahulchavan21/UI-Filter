import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CircleFilterComponent } from './circle-filter/circle-filter.component';
import { FilterService } from './circle-filter/filter.service';

@NgModule({
  declarations: [
    AppComponent,
    CircleFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
