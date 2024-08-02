import {Component} from '@angular/core';
import {AccountService} from "../../../service/account.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
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
export class LoginComponent {
  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(private accountService: AccountService, private router: Router) {
  }

  onLogin(form: NgForm): void {
    if (form.valid) {
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

}
