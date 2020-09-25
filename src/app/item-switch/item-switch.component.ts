import { ViewItemComponent } from './../view-item/view-item.component';
import { EditItemComponent } from './../edit-item/edit-item.component';
import { ItemsService } from './../items.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { Optional, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCloseComponent } from '../dialog-close/dialog-close.component';
import { MatPaginator } from '@angular/material/paginator';

export class ContactElement
{
  iid: number;
  iname: String;
  itype: String;
  idisc: String;
}

@Component({
  selector: 'app-item-switch',
  templateUrl: './item-switch.component.html',
  styleUrls: ['./item-switch.component.css']
})

export class ItemSwitchComponent implements OnInit, AfterViewInit
{
  nname = new FormControl("", [Validators.required]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  auth: string;
  ELEMENT_DATA: ContactElement[] = [];

  constructor(private cookie: CookieService, private itemsSer: ItemsService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
  ngAfterViewInit(): void
  {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void
  {
    this.auth = this.cookie.get("auth");
    this.updateTable()
  }

  displayedColumns: string[] = ["Item Id", "Item Name", "Item Type", "Item Discription", "Actions"];
  dataSource = new MatTableDataSource<ContactElement>(this.ELEMENT_DATA);

  updateTable()
  {
    //ELEMENT_DATA=[];
    let data = this.itemsSer.ItemtList(this.auth);
    //console.log(data);
    for (let element of data)
    {
      this.ELEMENT_DATA.push({ iid: element['itemId'], iname: element['name'], itype: element['type'], idisc: element['description'] });
    }
  }

  reloadx()
  {
    this.ELEMENT_DATA = [];
    this.updateTable();
    this.dataSource = new MatTableDataSource<ContactElement>([...this.ELEMENT_DATA]);
    this.dataSource.paginator = this.paginator;
  }


  getErrorMessage()
  {
    if (this.nname.hasError('required'))
    {
      return 'You must enter a value';
    }
  }

  createItem(name: String, type: String, disc: String)
  {
    this.itemsSer.createItem(name, disc, type, this.auth);
  }

  searchItem(id: String)
  {
    this.itemsSer.searchItem(id, this.auth).subscribe({
      next: data =>
      {
        //console.log(data);
        const dialogRef = this.dialog.open(ViewItemComponent, { autoFocus: true, width: '550px', data: { pageValue: data } });
      },

      error: error =>
      {
        console.error('There was an error!', error);
        alert("Invalid");
      }
    });
  }

  deleteButton(index:number,val: string)
  {
    console.log(val);
    let dialogRef = this.dialog.open(DialogCloseComponent);
    dialogRef.afterClosed().subscribe((res) =>
    {
      // received data from confirm-component
      if (res.data == true)
      {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.deleteItem(val);
      }
    });
/*     this.dataSource = this.dataSource.filter((value, key) =>
    {
      return value.iid != parseInt(val);
    }) */;

  }

  viewButton(val: string)
  {
    this.searchItem(val);
  }

  editButton(id:String)
  {
    const dialogRef = this.dialog.open(EditItemComponent, ({ autoFocus: true, width: '550px', data: { pageValue: id } }));
  }

  updateItem(uid: String, uname: String, utype: String, udisc: String)
  {
    this.itemsSer.updateContact(uid, uname, utype, udisc, this.auth);
  }

  deleteItem(id: String)
  {
    this.itemsSer.deleteItem(id, this.auth);
  }

}

//////////////////////////////////////////////////////////////////////
