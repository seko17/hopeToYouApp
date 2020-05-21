import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm  : FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email must be at least 4 characters long.' },
      { type: 'maxlength', message: 'Email cannot be more than 25 characters long.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
    ]
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email : new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      pwd :new FormControl('', Validators.required)
    })
  }
  login(v){
    console.log('s',v.value.pwd);
    
  }
}
