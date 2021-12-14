import { Component, OnInit } from '@angular/core';
import { getAuth } from "firebase/auth";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  logOut(){
    getAuth().signOut()
      .then(() => {
        this.router.navigate(['login'])
      })
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/user').toPromise()
      .then((res) => {
        console.log(res)
      })
  }

}
