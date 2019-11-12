import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ContractorListDataSource } from '../../datasource/contractor-list-datasource';
import { Router } from '@angular/router';
import { YesNoDialogData, ContractorMini, ContractorFilter } from 'src/app/models/models';
import { ContractorService } from 'src/app/services/contractor.service';
import { YesNoDialog } from '../dialog/yes-no-dialog/yes-no-dialog.component';
import { isNullOrUndefined } from 'util';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css', '../../app.component.css'],
})
export class ContractorListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ContractorListDataSource;
  contractors: ContractorMini[];
  columns = ['id', 'company', 'personName', 'trade', 'nip', 'actions'];
  filter: ContractorFilter;
  nan: number = NaN;
  contractorFilter = this.fb.group({
    company: [null, [Validators.maxLength(15)]],
    nip: [null, [Validators.maxLength(15)]],
    person: [null, [Validators.maxLength(15)]],
    trade: [null, [Validators.maxLength(15)]],
  })
  constructor(
    private route: Router,
    private service: ContractorService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
  ) {
    this.filter = {company:null, nip: null, person: null, trade: null}
  }

  ngOnInit() {
    this.refresh();
  }

  save(model: ContractorFilter) {
    this.filter = model;
    this.refresh();
  }

  delete(element: ContractorMini) {
    let dialogData: YesNoDialogData = {
      title: "Usuwanie kontrahenta",
      context: "Czy usunąć kontrahenta " + element.company + " o numerze nip: " + element.nip + "?",
      yesButton: "Usuń", noButton: "Anuluj"
    };
    let dialogRef = this.dialog.open(YesNoDialog, { data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(element.id).subscribe(
          result => {
            if (result) {
              this.showSnackBar("Udało się usunąć kontrahenta");
              this.refresh();
            } else this.showSnackBar("Przykro nam, ale nie udało się kontrahenta");
          }
        )
      }
    })
  }

  refresh() {
    this.service.getAll(this.filter).subscribe(result => {
      this.contractors = result;
      if (isNullOrUndefined(this.contractors)) {
        this.contractors = [];
      }
      this.dataSource = new ContractorListDataSource(this.paginator, this.sort, this.contractors);
    })
  }

  showSnackBar(text: string) { this.snackBar.open(text, '', { duration: 3000 }); }

}


