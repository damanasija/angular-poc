import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  lForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)

  });

  titleAlert = 'Enter value';

  constructor(private routes: Router, private Service: DataService) { }
  ngOnInit() {
  }

  moveToLogin() {
    this.routes.navigate(['/login']);
  }

  register() {
    if (!this.lForm.valid) {
      console.log('invalid Form'); return;
    }
    this.Service.register(JSON.stringify(this.lForm.value))
      .subscribe(
        data => { console.log(data); this.routes.navigate(['/login']); },
        error => console.error(error)
      );
  }
}
