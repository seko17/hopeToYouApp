import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( user =>{
      console.log(user.email);
      
    })
  }

}
