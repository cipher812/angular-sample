import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceFetchService } from '../service-fetch.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{
  user = new FormControl("", [Validators.required,Validators.email,Validators.minLength(4)]);
  pass= new FormControl("", [Validators.required,Validators.minLength(6)]);

  constructor(private servicefetch:ServiceFetchService,private cookie: CookieService) { }

  ngOnInit(): void
  {
    this.cookie.set("auth",null);
  }

  getErrorMessage()
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

    if (this.pass.hasError('required'))
    {
      return 'You must enter a value';
    }
    else if(this.pass.hasError('minlength'))
    {
      return "Enter minimum 6 characters";
    }
  }

  LoginAction(mail,pass)
  {
    this.servicefetch.login_function(mail,pass);
  }

}
