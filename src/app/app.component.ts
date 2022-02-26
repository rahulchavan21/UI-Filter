import { Component, OnInit } from '@angular/core';
import { Filter, MainFilter, SubFilter } from './circle-filter/Filter';
import { FilterService } from './circle-filter/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'BubbleFilter';
  public filters: Filter[] = [];
  public subFilters: Filter[] = [];
  public outerFilterSelected: string[] = [];
  public innerFilterSelected: string[] = [];
  public filteredData: any[] = [];
  constructor(private _filterService: FilterService) {
    //console.log("Constructor called");
  }
  ngOnInit(): void {
    this.processOuterFilter();
  }

  renderFiltersUI(capacity: number, radius: number, _filters: Filter[]) {
    const noOfFilters = _filters.length;
    var div = 360 / capacity;
    const parentdiv = document.getElementById('parentdiv');
    if (parentdiv != null) {
      const offsetToParentCenter = parentdiv.offsetWidth / 2; //assumes parent is square
      var offsetToChildCenter = 25;
      var totalOffset = offsetToParentCenter - offsetToChildCenter;
      for (var i = 0; i < noOfFilters; i++) {
        let filter: string = _filters[i].name;
        var childdiv = document.createElement('div');
        childdiv.className = "filter";
        childdiv.classList.add(_filters[i].type == 1 ? "outer" : "inner");
        childdiv.style.position = "absolute";
        var y = Math.sin((div * i) * (Math.PI / 100)) * radius;
        var x = Math.cos((div * i) * (Math.PI / 100)) * radius;
        childdiv.style.top = (y + totalOffset).toString() + "px";
        childdiv.style.left = (x + totalOffset).toString() + "px";
        childdiv.innerHTML += "<p class='filter-title'>" + _filters[i].name + "</p>";
        childdiv.setAttribute("id", filter);
        childdiv.setAttribute("data", JSON.stringify(_filters[i]));
        childdiv.setAttribute("selected", "false");
        childdiv.addEventListener('click', (e) => { this.setSelected(e) });
        parentdiv.appendChild(childdiv);
      }
    }
  }

  processOuterFilter() {
    this._filterService.getOuterFilter().subscribe((data) => {
      //console.log(data);
      this.filters = data;
      this.renderFiltersUI(16, 200, this.filters);
      this.proccessInnerFilter();
    });


  }

  proccessInnerFilter() {
    //This can be handled by backend API to process and give subfilters to select
    this._filterService.getinnerFilter().subscribe((data) => {
      this.subFilters = data;
      if (this.outerFilterSelected.length > 0) {
        this.subFilters = this.getInncerFilter(this.subFilters as SubFilter[]);
      }
      var allInner = document.getElementsByClassName('inner');
      while (allInner[0]) {
        allInner[0].parentNode != null ? allInner[0].parentNode.removeChild(allInner[0]) : "";
      }
      console.log(this.subFilters);
      this.renderFiltersUI(16, 100, this.subFilters);
    });
  }

  getInncerFilter(subFilters: SubFilter[]) {
    //This can be handled by backend API
    let newInnerFilters: SubFilter[] = [];
    for (let i = 0; i < subFilters.length; i++) {
      let mainFilters = subFilters[i].mainFilter;
      for (let j = 0; j < this.outerFilterSelected.length; j++) {
        if (mainFilters.includes(this.outerFilterSelected[j])) {
          newInnerFilters.push(subFilters[i]);
        }
      }
    }
    var unique = newInnerFilters.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    return unique;
  }

  setSelected(e: Event) {
    const event = e.currentTarget as Element;
    let filterSelected = JSON.parse(event.getAttribute('data') || '{}');
    let selected = JSON.parse(event.getAttribute('selected') || '{}');
    if (filterSelected.type === 1) {
      if (selected === false) {
        this.outerFilterSelected.push(filterSelected.name);
        event.classList.add("filter-selected");
        event.setAttribute("selected", "true");
        this.proccessInnerFilter();
      } else {
        this.outerFilterSelected = this.outerFilterSelected.filter(obj => obj !== filterSelected.name);
        event.classList.remove("filter-selected");
        event.setAttribute("selected", "false");
        this.proccessInnerFilter();
      }

    } else {
      if (selected === false) {
        this.innerFilterSelected.push(filterSelected.name);
        event.classList.add("filter-selected");
        event.setAttribute("selected", "true");
        this.proccessFilterList();
      } else {
        this.innerFilterSelected = this.outerFilterSelected.filter(obj => obj !== filterSelected.name);
        event.classList.remove("filter-selected");
        event.setAttribute("selected", "false");
        this.proccessFilterList();
      }
    }


    console.log(this.outerFilterSelected);
  }
  proccessFilterList() {
    this._filterService.getFilterData().subscribe((data) => {
      this.filteredData = data;
      let listToShow : any[] = []; 
      for (let i = 0; i < this.filteredData.length; i++) {
        let exitInOuterFilter = false;
        let exitInInnerFilter = false;
        for (let fdo = 0; fdo < this.filteredData[i].outerFilter.length; fdo++) {
          //for (let outr = 0; outr < this.outerFilterSelected.length; outr++) {
            if (this.outerFilterSelected.includes(this.filteredData[i].outerFilter[fdo])) {
              exitInOuterFilter = true;
              break;
            }
          }
        //}
        for(let fdi = 0; fdi < this.filteredData[i].innerFilter.length; fdi++){
          //for (let innr = 0; innr < this.innerFilterSelected.length; innr++) {
            if (this.innerFilterSelected.includes(this.filteredData[i].innerFilter[fdi])) {
              exitInInnerFilter = true;
              break;
            }
          }

          if(exitInInnerFilter == true && exitInOuterFilter == true){
            listToShow.push(this.filteredData[i])
          }
        }
        var unique = listToShow.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        })
        const listView = document.getElementById("filterDataSet");
        listView!= null ? listView.innerHTML = "" : "";
        for(let dataSet = 0; dataSet < unique.length; dataSet++){
          var listElm = document.createElement('div');
          listElm.innerHTML+= ""+unique[dataSet].name;
          listElm.classList.add("data-set");
          listView?.appendChild(listElm);
        }
        console.log(unique);
        return unique;
    });
  }
}
