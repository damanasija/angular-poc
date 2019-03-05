import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../data.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {
  issue: String;
  public issues: Array<any> = [];
  category: String;
  public categories: Array<any> = [];
  assigne: String;
  public assignes: Array<any> = [];
  reporte: String;
  public reportes: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public Service: DataService) { }

              // tslint:disable-next-line:use-life-cycle-interface
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
                  // tslint:disable-next-line:one-line
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
  // tslint:disable-next-line:member-ordering
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.Service.updateItem(this.data);
  }
}
