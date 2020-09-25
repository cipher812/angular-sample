import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ServiceFetchService } from './../service-fetch.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  dob:String,
  mail:String,
  adrs:String,
  desig:String
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  constructor(private servicefetch:ServiceFetchService) { }
/*
  tableData()
  {
    const json=this.servicefetch.getData();
    const data=JSON.parse(json)

    console.log(json)

    for(let element of data)
    {
      ELEMENT_DATA.push({ position: element['id'], name: element['name'], weight:element['no'], symbol: element['gen'],dob:element['dob'],mail:element['mail'],adrs:element['addr'],desig:element['desig'] })
      console.log(element['id'])
    }
    window.location.reload()
  }
 */
  ngOnInit(): void
  {

/*    // const json=this.servicefetch.getData();
    //const data=JSON.parse(json)

    console.log(json)

    for(let element of data)
    {
      ELEMENT_DATA.push({ position: element['id'], name: element['name'], weight:element['no'], symbol: element['gen'],dob:element['dob'],mail:element['mail'],adrs:element['addr'],desig:element['desig'] })
      console.log(element['id'])
    } */

  }



  displayedColumns: string[] = ['Employee Id', 'Employee Name', 'Number', 'Gender', 'DoB', 'Mail', 'Address', 'Designation'];
  dataSource = ELEMENT_DATA;

}
