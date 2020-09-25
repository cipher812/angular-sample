import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Console } from 'console';
import { map } from 'rxjs/operators';

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class ServiceFetchService {

  constructor(private http: HttpClient, private cookie: CookieService, private route: ActivatedRoute,
    private router: Router) { }

  /*   SendData(name: String, id: String, number: Number, gender: String, date: String, email: String, adress: String, desig: String) {

      $.ajax({
        type: 'POST',
        url: 'http://localhost/sample-project/scripts/send_data.php',
        cache: false,
        data: {
          name: name,
          id: id,
          phno: number,
          gen: gender,
          dob: date,
          mail: email,
          addr: adress,
          desig: desig
        },
        success: function (data) {

          //console.log(data);
          const json = JSON.parse(data);

          if (json["statusCode"] == 200) {
            alert("Data added succesfully");
          }
          else {
            alert("Error");
          }

        },
        error: function (jqXHR, status, err) {
          console.log("Error")
        }
      });

      //let data;
      //data = "Employee Name: " + name + "\n" + "Employee Id: " + id + "\n" + "Mob. Number: " + number + "\n" + "Gender: " + gender + "\n" + "Date: " + date + "\n" + "Email: " + email + "\n" + "Address: " + adress + "\n" + "Designation: " + desig;
      //console.log(data)
    }



    getData() {
      var json;

      $.ajax({
        'async': false,
        'type': "POST",
        'global': false,
        'url': "http://localhost/sample-project/scripts/get_data.php",
        'success': function (data) {
          json = data;
          //console.log(json);
        }
      });

      //console.log(json);
      return json;

    } */


  signup_function(name: String, mail: String, pass: String) {
    const headers = { "content-type": "application/json" }
    const body = { name: name, email: mail, password: pass }

    this.http.post<any>("http://localhost:8080/users", body, { headers }).subscribe(data => {

      if (data["status"] == 1) {
        alert("Sucesssfully created")
      }
      else {
        alert("Error")
      }

    });
  }

  login_function(mail: String, pass: String) {
    const headers = { "content-type": "application/json" }
    const body = { email: mail, password: pass }

    var auth;

    this.http.post("http://localhost:8080/login", body, { headers }).subscribe({
      next: data => {
        if (data["status"] == 1) {
          auth = data["accessToken"]["value"];
          this.cookie.set("auth", auth);
          this.router.navigate(["/switch-component", { id: data["userId"] }])
        }
      },
      error: error => {
        console.error('There was an error!', error);
        alert("Invalid")
      }

    });
  }

  createContact_function(fname: String, lname: String, nname: String, adr: String, dob: String, city: String, state: String, country: String, zipcode: String, email: String, phno: String, auth: String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };
    const body = { firstName: fname, lastName: lname, nickName: nname, dob: dob, address: adr, city: city, state: state, country: country, zipCode: zipcode, phones: [phno], emails: [email] };


    this.http.post("http://localhost:8080/contacts", body, { headers }).subscribe({next: data =>
    {
      console.log(data)
      if(data!=null)
      {
        alert("Contact Added");
      }
    },

    error: error =>
    {
        console.error('There was an error!', error);
        alert("Invalid")
    }});

  }

   ContactList(auth:String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };

    var json;

      $.ajax({
        'async': false,
        'type': "GET",
        'global': false,
        'headers':headers,
        'url': "http://localhost:8080/contacts",
        'success': function (data)
        {
          json = data;
        }
      });

      //console.log(json);
      return json;
  }

  async ContactId(id:Number,auth:String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };
    return await this.http.get<any>('http://localhost:8080/contacts/'+id, {headers}).toPromise();
  }

  updateContact(id:Number,fname: String, lname: String, nname: String, adr: String, dob: String, city: String, state: String, country: String, zipcode: String, email: String, phno: String, auth: String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };
    const body = { firstName: fname, lastName: lname, nickName: nname, dob: dob, address: adr, city: city, state: state, country: country, zipCode: zipcode, phones: [phno], emails: [email] };


    this.http.put("http://localhost:8080/contacts/"+id, body, { headers }).subscribe({next: data =>
    {
      console.log(data)
      alert("Updated Succesfully");
    },

    error: error =>
    {
        console.error('There was an error!', error);
        alert("Invalid");
    }});

  }

  DeleteContact(id:Number, auth: String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };

    this.http.delete("http://localhost:8080/contacts/"+id, { headers }).subscribe({next: data =>
    {
      //console.log(data)
      alert("Deleted Succesfully");
    },

    error: error =>
    {
        console.error('There was an error!', error);
        alert("Invalid");
    }});

  }
}
