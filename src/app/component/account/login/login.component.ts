import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../service/account.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private accountService: AccountService, private router: Router,private route:ActivatedRoute) {  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accountService.getUserById(id).subscribe(user => {
        this.email = user.email;
        this.password = user.password;
      });
    }
  }

  onLogin(): void {
    if (this.email && this.password) {
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
