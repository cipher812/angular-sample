import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class ItemsService
{
  constructor(private http: HttpClient, private cookie: CookieService, private route: ActivatedRoute,private router: Router) { }

  ItemtList(auth:String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };

    var json;

      $.ajax({
        async: false,
        type: "GET",
        global: false,
        headers:headers,
        url: "http://localhost:8080/item",
        success: function (data)
        {
          json = data;
        },
        error:function(error){console.error('There was an error!', error);}
      });

      //console.log(json);
      return json;
  }

  createItem(aname:String,atype:String,disc:String,auth:String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };
    const body = { name:aname,description:disc,type:atype };


    this.http.post("http://localhost:8080/item", body, { headers }).subscribe({next: data =>
    {
      console.log(data)
      alert("Created Succesfully");
    },

    error: error =>
    {
        console.error('There was an error!', error);
        alert("Invalid");
    }});
  }

  searchItem(id:String,auth:String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };
    return this.http.get("http://localhost:8080/item/"+id, { headers });
  }

  updateContact(id:String,uname:String,utype:String,udisc:String,auth:String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };
    const body = { name:uname,type:utype,description:udisc };


    this.http.put("http://localhost:8080/item/"+id, body, { headers }).subscribe({next: data =>
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

  deleteItem(id:String, auth: String)
  {
    const headers = { "content-type": "application/json", "Authorization": "Contacts " + auth };

    this.http.delete("http://localhost:8080/item/"+id, { headers }).subscribe({next: data =>
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
