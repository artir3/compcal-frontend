import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { SnackBarService } from '../snackbar/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { ActivateModel } from 'src/app/models/models';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: SnackBarService,
    private service: UserService
  ) { }
  autorized: Boolean = null;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      let hash: string = params['hash'];
      if (isNullOrUndefined(hash)) {
        this.snackbar.show("Nie poprawny adres url");
        this.router.navigateByUrl("/login");
      } else {
        let activateModel: ActivateModel = { code: hash };
        this.service.authorize(activateModel).subscribe(result => {
          this.autorized = result;
        })
      }
    });
    
  }

}
