import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-close',
  templateUrl: './dialog-close.component.html',
  styleUrls: ['./dialog-close.component.css']
})
export class DialogCloseComponent implements OnInit
{
  // receive data from parent using 'MAT_DIALOG_DATA'
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<DialogCloseComponent>) { }

  ngOnInit(): void
  {
  }

  confirm()
  {
    this.dialogRef.close({ data: true })
  }

}
