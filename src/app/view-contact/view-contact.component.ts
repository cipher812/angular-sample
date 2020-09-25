import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  fromPage:String;
  //datas:String[10];

  constructor(public dialogRef: MatDialogRef<ViewContactComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.fromPage = data.pageValue;
    //console.log(this.fromPage['contactId'])
    data[0]=this.fromPage['contactId'];
    data[1]=this.fromPage['firstName'];
    data[2]=this.fromPage['lastName'];
    data[3]=this.fromPage['nickName'];
    data[4]=this.fromPage['dob'];
    data[5]=this.fromPage['city'];
    data[6]=this.fromPage['state'];
    data[7]=this.fromPage['country'];
    data[8]=this.fromPage['zipCode'];
    data[9]=this.fromPage['address'];
  }

  ngOnInit(): void {
  }

}
