import { Component } from '@angular/core';
import {AccountService, User} from "../../../service/account.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private accountService:AccountService,private router:Router) {  }

  // onSubmit() :void{
  //   const user = {
  //     id: crypto.randomUUID(),
  //     username: this.username,
  //     email: this.email,
  //     password: this.password
  //   }
  //   this.accountService.addUser(user).subscribe(response => {
  //     this.username = '';
  //     this.email = '';
  //     this.password = '';
  //     this.router.navigate(['/']).then();
  //   });
  // }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newUser: User = {
        id: crypto.randomUUID().substring(0, 8),
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.accountService.addUser(newUser).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => this.errorMessage = error.message
      });
    }
  }

}
