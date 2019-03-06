import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;
  username: string;
  password: string;
  titleAlert = 'Enter value';

  constructor(private fb: FormBuilder, private routes: Router, private service: DataService) {
    this.rForm = fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  } msg;

  ngOnInit() {
  }
  moveToRegister() {
    this.routes.navigate(['/Registration']);
  }

  ngAfterViewInit() {
    console.log("in login component");
    let username = localStorage.getItem('username');
    if(username != null && username != undefined) {
      console.log(username);
      this.routes.navigate(['/Dashboard']);
    }
  }

  login() {
    if (!this.rForm.valid) {
      console.log('invalid Form'); return;
    }
    console.log(this.rForm.value);
    this.service.login(this.rForm.value)
      .pipe(first())
      .subscribe((isAuth: boolean) => {
        if (isAuth) {
          this.routes.navigate(['/Dashboard']);
        } else {
          alert("Invalid username or password");
        }
      });
  }
}