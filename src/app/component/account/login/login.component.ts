import {Component, OnInit} from '@angular/core';
import {AccountService, User} from "../../../service/account.service";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userSubscription: Subscription | undefined;
  users:User[] = [];

  constructor(private accountService: AccountService,private router: Router) {  }

  ngOnInit() {
    this.userSubscription = this.accountService.getUser().subscribe(users =>{
      this.users = users ? [users] : [];
    });
  }

  onLogin(): void {
    this.accountService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/books']).then();
        this.email = '';
        this.password = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

}
