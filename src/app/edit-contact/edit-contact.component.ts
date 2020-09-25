import { Component, OnInit, AfterViewInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { ServiceFetchService } from '../service-fetch.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit,AfterViewInit
{
  mail = new FormControl("", [Validators.required, Validators.email, Validators.minLength(4)]);
  phnoa = new FormControl("", [Validators.required, Validators.minLength(10)]);
  nname = new FormControl("", [Validators.required]);

  auth: string;
  CId: string;

  @ViewChild('fname') fnameInputRef: ElementRef;
  @ViewChild('lname') lnameInputRef: ElementRef;
  @ViewChild('nnamex') nnameInputRef: ElementRef;
  @ViewChild('adr') adrInputRef: ElementRef;
  @ViewChild('dob') dobInputRef: ElementRef;
  @ViewChild('city') cityInputRef: ElementRef;
  @ViewChild('state') stateInputRef: ElementRef;
  @ViewChild('country') countryInputRef: ElementRef;
  @ViewChild('zipcode') zipcodeInputRef: ElementRef;
  @ViewChild('email') emailInputRef: ElementRef;
  @ViewChild('phone') phoneInputRef: ElementRef;


  constructor(public dialogRef: MatDialogRef<EditContactComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private cookie: CookieService, private servicefetch: ServiceFetchService, public datepipe: DatePipe)
  {
    this.CId=data["pageValue"];
  }

  ngAfterViewInit(): void
  {
    this.loadData();
  }

  ngOnInit(): void
  {
    this.auth = this.cookie.get("auth");
  }

  getErrorMessage()
  {
    if (this.mail.hasError('required'))
    {
      return 'You must enter a value';
    }
    else if (this.mail.hasError('minlength'))
    {
      return "Enter minimum 4 characters";
    }
    else if (this.mail.hasError('email'))
    {
      return "Enter valid mail";
    }

    if (this.phnoa.hasError('required'))
    {
      return 'You must enter a value';
    }
    else if (this.phnoa.hasError('minlength'))
    {
      return "Enter minimum 10 characters";
    }

    if (this.nname.hasError('required'))
    {
      return 'You must enter a value';
    }
  }

  async loadData()
  {
    let nid = Number.parseInt(this.CId);
    let data = await this.servicefetch.ContactId(nid, this.auth);

    console.log(data);

    this.fnameInputRef.nativeElement.value=data['firstName'];
    this.lnameInputRef.nativeElement.value=data['lastName'];
    this.nnameInputRef.nativeElement.value=data['nickName'];
    this.adrInputRef.nativeElement.value=data['address'];
    this.dobInputRef.nativeElement.value=data['dob'];
    this.cityInputRef.nativeElement.value=data['city'];
    this.stateInputRef.nativeElement.value=data['state'];
    this.countryInputRef.nativeElement.value=data['country'];
    this.zipcodeInputRef.nativeElement.value=data['zipCode'];
    this.emailInputRef.nativeElement.value=data['emails'][0];
    this.phoneInputRef.nativeElement.value=data['phones'][0];

  }

  updateContact(fname: String, lname: String, nname: String, adr: String, dob: String, city: String, state: String, country: String, zipcode: String, email: String, phno: String)
  {
    let date = this.datepipe.transform(dob, 'yyyy-MM-dd');
    let cid = Number.parseInt(this.CId);
    this.servicefetch.updateContact(cid, fname, lname, nname, adr, date, city, state, country, zipcode, email, phno, this.auth);
  }


}
