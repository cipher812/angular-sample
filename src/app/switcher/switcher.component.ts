import { DialogCloseComponent } from './../dialog-close/dialog-close.component';
import { EditContactComponent } from './../edit-contact/edit-contact.component';
import { ViewContactComponent } from './../view-contact/view-contact.component';
import { element } from 'protractor';
import { CookieService } from 'ngx-cookie-service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, ValidationErrors } from '@angular/forms';
import { ServiceFetchService } from '../service-fetch.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Optional, Inject } from '@angular/core';
import { RestrictedDirective } from '../restricted.directive';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export class ContactElement
{
  cid: number;
  fname: String;
  lname: String;
  nnames: String;
  dobs: String;
  adrs: String;
  city: String;
  state: String;
  country: String;
  zip: String;
}

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css'],
})
export class SwitcherComponent implements OnInit, AfterViewInit
{
  mail = new FormControl('', [Validators.required,Validators.email,Validators.minLength(4)]);
  phnoa = new FormControl('', [Validators.required, Validators.minLength(10)]);
  nname = new FormControl('', [Validators.required]);
  fnames = new FormControl('', [Validators.required]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  auth: String;
  ELEMENT_DATA: ContactElement[] = [];

  constructor(private cookie: CookieService, private servicefetch: ServiceFetchService, public datepipe: DatePipe, private dialog: MatDialog) { }

  ngAfterViewInit(): void
  {
    this.dataSource.paginator = this.paginator;
  }

  tablex()
  {
    let data = this.servicefetch.ContactList(this.auth);
    for (let element of data)
    {
      this.ELEMENT_DATA.push({
        cid: element['contactId'], fname: element['firstName'], lname: element['lastName'], nnames: element['nickName'], dobs: element['dob'], adrs: element['address'],
        city: element['city'], state: element['state'], country: element['country'], zip: element['zipCode'],
      });
    }
  }

  ngOnInit(): void
  {
    this.auth = this.cookie.get('auth');
    this.tablex();
  }

  displayedColumns: string[] = ['Contact Id', 'First Name', 'Last Name', 'Nick Name', 'DoB', 'Address', 'City', 'State', 'Country', 'ZIP Code', 'Actions',];
  dataSource = new MatTableDataSource<ContactElement>(this.ELEMENT_DATA);

  getErrorMessage()
  {
    if (this.mail.hasError('required'))
    {
      return 'You must enter a valid value';
    } else if (this.mail.hasError('minlength'))
    {
      return 'Enter minimum 4 characters';
    } else if (this.mail.hasError('email'))
    {
      return 'Enter valid mail';
    }

    if (this.phnoa.hasError('required'))
    {
      return 'You must enter a value';
    } else if (this.phnoa.hasError('minlength'))
    {
      return 'Enter minimum 10 characters';
    }

    if (this.nname.hasError('required'))
    {
      return 'You must enter a valid value';
    }
  }

  getFnameError()
  {
    if (this.fnames.hasError('required'))
    {
      return 'You must enter a valid value';
    }
  }

  createContact(fname: String, lname: String, nname: String, adr: String, dob: String, city: String, state: String,
    country: String, zipcode: String, email: String, phno: String)
{
    let date = this.datepipe.transform(dob, 'yyyy-MM-dd');
    this.servicefetch.createContact_function(fname, lname, nname, adr, date, city, state, country, zipcode, email, phno, this.auth);
  }

  async contactSearch(cid: string)
  {
    let nid = Number.parseInt(cid);
    let details = await this.servicefetch.ContactId(nid, this.auth);
    //console.log(details);
    const dialogRef = this.dialog.open(ViewContactComponent, {
      autoFocus: true,
      width: '550px',
      data: { pageValue: details },
    });
  }

  updateContact(sid: string, fname: String, lname: String, nname: String, adr: String, dob: String, city: String, state: String, country: String,
    zipcode: String, email: String, phno: String)
  {
    let date = this.datepipe.transform(dob, 'yyyy-MM-dd');
    let cid = Number.parseInt(sid);
    this.servicefetch.updateContact(cid, fname, lname, nname, adr, date, city, state, country, zipcode, email, phno, this.auth);
  }

  deleteContact(id: string)
  {
    let nid = Number.parseInt(id);
    this.servicefetch.DeleteContact(nid, this.auth);
  }

  deleteButton(index: number, val: string)
  {
    //console.log(val+index);

    let dialogRef = this.dialog.open(DialogCloseComponent);
    dialogRef.afterClosed().subscribe((res) =>
    {
      // received data from confirm-component
      if (res.data == true)
      {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.deleteContact(val);
      }
    });
    /* this.dataSource.data.splice(index,1);
    this.dataSource._updateChangeSubscription();
    this.deleteContact(val); */
  }

  viewButton(val: string)
  {
    this.contactSearch(val);
  }

  editButton(id: String)
  {
    const dialogRef = this.dialog.open(EditContactComponent, { autoFocus: true, width: '550px', data: { pageValue: id } });
  }

  reloadx()
  {
    this.ELEMENT_DATA = [];
    this.tablex();
    this.dataSource = new MatTableDataSource<ContactElement>([...this.ELEMENT_DATA]);
    this.dataSource.paginator = this.paginator;
  }
}
