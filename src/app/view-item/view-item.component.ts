import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  fromPage: String;
  //datas:String[10];

  constructor(public dialogRef: MatDialogRef<ViewItemComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.fromPage = data.pageValue;
    console.log(this.fromPage);
  }

  ngOnInit(): void {
  }

}
