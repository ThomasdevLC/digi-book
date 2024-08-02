import {Component, OnInit} from '@angular/core';
import {AccountService, User} from "../../../service/account.service";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  signUpForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb:FormBuilder, private accountService:AccountService,private router:Router,private notify:ToastrService) {  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const newUser: User = {
        id: crypto.randomUUID().substring(0, 8),
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      };
      this.accountService.addUser(newUser).subscribe({
        next: () => {
          this.notify.success('Votre compte est crée', 'Success');
          this.router.navigate(['/login',newUser.id]).then();
        },
        error: (error) => this.notify.error(error, 'Error')
      });
    }
  }

}
