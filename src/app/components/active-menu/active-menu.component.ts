import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { YesNoDialog } from '../dialog/yes-no-dialog/yes-no-dialog.component';
import { YesNoDialogData } from 'src/app/models/models';

@Component({
  selector: 'app-active-menu',
  templateUrl: './active-menu.component.html',
  styleUrls: ['./active-menu.component.css']
})
export class ActiveMenuComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private auth: AuthenticationService) { }

  ngOnInit() { }

  openLogout() {
    let dialogData: YesNoDialogData = { 
      title: "Wylogowanie", 
      context: "czy na pewno chcesz się wylogować?",
      yesButton: "wyloguj", noButton: "Anuluj"
    };
    let dialogRef = this.dialog.open(YesNoDialog, { data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.auth.logout();
      }
    })
  }

  isLogged() {
    return this.auth.isLogged();
  }
}
