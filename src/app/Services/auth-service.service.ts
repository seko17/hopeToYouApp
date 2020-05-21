import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  creatUser(email: string, pwd: string): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email ,pwd);
  }

  loginUser(email: string, pwd: string){
    
  }
}
