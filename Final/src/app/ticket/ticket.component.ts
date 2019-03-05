import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  pro: string;
  summ: string;
  iss: string;
  pri: string;
  ass: string;
  rep: string;


  tForm: FormGroup = new FormGroup({
    projectname: new FormControl(null, Validators.required),
    summary: new FormControl(null, Validators.required),
    issue: new FormControl(null),
    priority: new FormControl(),
    assigne: new FormControl(),
    reporter: new FormControl(),

  });

  titleAlert = 'Enter Value';

  // tslint:disable-next-line:ban-types
  issue: String;
  public issues: Array<any> = [];
  // tslint:disable-next-line:ban-types
  category: String;
  public categories: Array<any> = [];
  // tslint:disable-next-line:ban-types
  assigne: String;
  public assignes: Array<any> = [];
  // tslint:disable-next-line:ban-types
  reporte: String;
  public reportes: Array<any> = [];


  constructor(private routes: Router, private Service: UserService, ) { }
  ngOnInit() {

const issue = {
  issues: this.issue
};
console.log(issue);
this.Service.Dataload(issue).subscribe((data: any) => {
console.log(data);
if (data.success) {
    this.issues = data.mainIssues;
    console.log('Ready Drop down for Issues');
} else {
   console.log('Fail Drop down for Issues');
}
});

const category = {
  categories: this.category
};
console.log(category);
this.Service.loadData(category).subscribe((data: any) => {
console.log(data);
if (data.success) {
    this.categories = data.mainCategories;
    console.log('Ready Drop down for Priority');
} else {
   console.log('Fail Drop down for Priority');
}
});

const assigne  = {
  assignes: this.assigne
};
console.log(assigne);
this.Service.load(assigne).subscribe((data: any) => {
console.log(data);
if (data.success) {
    this.assignes = data.mainAssignes;
    console.log('Ready Drop down for assigne');
} else {
   console.log('Fail Drop down for assigne');
}
});

const reporte  = {
  reportes: this.reporte
};
console.log(reporte);
this.Service.Rload(reporte).subscribe((data: any) => {
console.log(data);
if (data.success) {
    this.reportes = data.mainReportes;
    console.log('Ready Drop down for Reporter');
} else {
   console.log('Fail Drop down for Reporter');
}
});
}

moveToLogin() {
    this.routes.navigate(['/login']);
  }

  ticket() {
    if (!this.tForm.valid) {
      console.log('invalid Form'); return;
    }
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:max-line-length
    const data = {formvalue: this.tForm.value, projectname: this.pro, summary: this.summ,
       issue: this.iss, priority: this.pri, aasigne: this.ass, reporter: this.rep};
    this.Service.ticket(JSON.stringify(data))
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => { console.log(data); this.routes.navigate(['/login']); },
        error => console.error(error)
      );
  }
}
