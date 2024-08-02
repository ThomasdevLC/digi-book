import {Component, OnInit} from '@angular/core';
import {AccountService, User} from "../../../service/account.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ConfirmationDialogComponent
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{
  userData:User | null = null;
  showConfirmation:boolean = false;
  confirmationMessage = '';

  constructor(private accountService:AccountService, private router: Router,private notify:ToastrService) {  }

  ngOnInit() {
    this.accountService.getUser().subscribe(user =>{
      this.userData = user;
    });
  }

  onDelete(){
    this.confirmationMessage = 'Voulez vous vraiment supprimer votre compte ?';
    this.showConfirmation = true;
  }

  onConfirm(): void {
    this.accountService.deleteAccount().subscribe(() => {
      this.router.navigate(['/login']).then();
      this.notify.info('Vous allez nous manquer', 'Suppression de compte');
    });
  }

  /** OnCancel
   * @description OnCancel method
   */
  onCancel(): void {
    this.showConfirmation = false;
  }
}
