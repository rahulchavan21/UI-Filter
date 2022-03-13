import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filter } from './Filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService implements OnInit{

  public data = {};
  public outerFilter:any = [];
  public innerFilter:any = [];
  public filterData:any = [];

  constructor(private httpClient: HttpClient) {
    
    this.filterData = this.getFilterData().subscribe((data) =>{
      //console.log(data);
      this.outerFilter = data;
    });
   }

  ngOnInit(): void {
    
  }


  getOuterFilter() : Observable<any>{
    return this.httpClient.get("./assets/outer-filter.json");
  }

  getinnerFilter() : Observable<any>{
    return this.httpClient.get("./assets/inner-filter.json");
  }

  getFilterData() : Observable<any>{
    return this.httpClient.get("./assets/filter-data.json");
  }
}
