import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { Optional, Inject } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ItemsService } from '../items.service';

//declare var $: any;


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit,AfterViewInit
{
  @ViewChild('uiname') nameInputRef: ElementRef;
  @ViewChild('uitype') typeInputRef: ElementRef;
  @ViewChild('uidisc') discInputRef: ElementRef;

  nname = new FormControl("", [Validators.required]);
  auth:String;
  itemId:String;

  constructor(public dialogRef: MatDialogRef<EditItemComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private cookie: CookieService,private itemsSer: ItemsService)
  {
    console.log(data);
    this.itemId=data["pageValue"];
  }

  ngAfterViewInit(): void
  {
    //throw new Error("Method not implemented.");
    this.loadData();
  }

  ngOnInit(): void
  {
    this.auth = this.cookie.get("auth");
  }

  loadData()
  {
    this.itemsSer.searchItem(this.itemId, this.auth).subscribe({
      next: data =>
      {
        //console.log(data);
        this.nameInputRef.nativeElement.value=data['name'];
        this.typeInputRef.nativeElement.value=data['type'];
        this.discInputRef.nativeElement.value=data['description'];
      },

      error: error =>
      {
        console.error('There was an error!', error);
        alert("Invalid");
      }
    });
  }

  updateItem(uname: String, utype: String, udisc: String)
  {
    //this.idInputRef.nativeElement.value="hi"
    //console.log(utype);
    this.itemsSer.updateContact(this.itemId, uname, utype, udisc, this.auth);
    this.dialogRef.close();
  }

  getErrorMessage()
  {
    if (this.nname.hasError('required'))
    {
      return 'You must enter a value';
    }
  }

}
