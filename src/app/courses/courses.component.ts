import { ServiceFetchService } from './../service-fetch.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit
{

  constructor(private servicefetch:ServiceFetchService)
  {

  }

  ngOnInit(): void
  {

  }

  digits_count(n): Number
  {
    let count = 0;
    if (n >= 1) ++count;

    while (n / 10 >= 1)
    {
      n /= 10;
      ++count;
    }

    return count;
  }

  checkForm()
  {
    if (name == "")
    {
      alert("Check if all the field are entered");
    }
    else
    {

    }
  }

  showText(name: String, id: String, number: Number, gender: String, date: String, email: String, adress: String, desig: String)
  {
    let sta:Boolean=true;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (name == "")
    {
      //alert("Check if all the field are entered");
      document.getElementById("name").innerHTML = "Field cannot be empty";
      document.getElementById('name').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("name").innerHTML = "";
      sta=false;
    }
    if(id == "")
    {

      document.getElementById("aid").innerHTML = "Field cannot be empty";
      document.getElementById('aid').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("aid").innerHTML = "";
      sta=false;
    }
    if(number == null)
    {

      document.getElementById("no").innerHTML = "Field cannot be empty";
      document.getElementById('no').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("no").innerHTML = "";
      sta=false;
    }
    if(gender == "")
    {

      document.getElementById("gen").innerHTML = "Field cannot be empty";
      document.getElementById('gen').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("gen").innerHTML = "";
      sta=false;
    }
    if(date == "")
    {
      document.getElementById("dob").innerHTML = "Field cannot be empty";
      document.getElementById('dob').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("dob").innerHTML = "";
      sta=false;
    }
    if(adress == "")
    {

      document.getElementById("adr").innerHTML = "Field cannot be empty";
      document.getElementById('adr').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("adr").innerHTML = "";
      sta=false;
    }
    if(desig == "")
    {
      document.getElementById("des").innerHTML = "Field cannot be empty";
      document.getElementById('des').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("des").innerHTML = "";
      sta=false;
    }
    if(email == "" || !(re.test(email+"")))
    {
      document.getElementById("mail").innerHTML = "Enter valid Mail Id";
      document.getElementById('mail').style.color = 'red';
      sta=true;
    }
    else
    {
      document.getElementById("mail").innerHTML = "";
      sta=false;
    }

    if (name.length > 50)
    {
      //alert("Employe name should be less than 50")
      document.getElementById("name").innerHTML = "Employe name should be less than 50";
      document.getElementById('name').style.color = 'red';
    }
    else if (this.digits_count(number) != 10)
    {
      //alert("Check Phone Number")
      document.getElementById("no").innerHTML = "Insert a valid number";
      document.getElementById('no').style.color = 'red';
    }
    else
    {
      /* let data: String;
      data = "Employee Name: " + name + "\n" + "Employee Id: " + id + "\n" + "Mob. Number: " + number + "\n" + "Gender: " + gender + "\n" + "Date: " + date + "\n" + "Email: " + email + "\n" + "Address: " + adress + "\n" + "Designation: " + desig;
      alert(data); */
      if(sta==false)
      {
        //this.servicefetch.SendData(name,id,number,gender,date,email,adress,desig);
      }

    }
  }

}
