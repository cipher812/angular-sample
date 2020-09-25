import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceFetchService } from '../service-fetch.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit
{

  user = new FormControl("", [Validators.required,Validators.email,Validators.minLength(4)]);
  pass= new FormControl("", [Validators.required,Validators.minLength(6)]);
  name= new FormControl("", [Validators.required,Validators.minLength(4)]);

  constructor(private servicefetch:ServiceFetchService,private cookie: CookieService) { }

  ngOnInit(): void
  {
    this.cookie.set("auth", null);
  }


  getmailErrorMessage()
  {
    if (this.user.hasError('required'))
    {
      return 'You must enter a value';
    }
    else if(this.user.hasError('minlength'))
    {
      return "Enter minimum 4 characters";
    }
    else if(this.user.hasError('email'))
    {
      return "Enter valid mail";
    }

  }

  getpassErrorMessage()
  {
    if (this.pass.hasError('required'))
    {
      return 'You must enter a value';
    }
    else if(this.pass.hasError('minlength'))
    {
      return "Enter minimum 6 characters";
    }
  }

  getnameErrorMessage()
  {
    if (this.name.hasError('required'))
    {
      return 'You must enter a value';
    }
    else if(this.name.hasError('minlength'))
    {
      return "Enter minimum 4 characters";
    }
  }

  loginAction(name,mail,pass)
  {

    this.servicefetch.signup_function(name,mail,pass);

  }

}
