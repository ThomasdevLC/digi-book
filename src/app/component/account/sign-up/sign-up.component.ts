import {Component} from '@angular/core';
import {AccountService, User} from "../../../service/account.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

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
export class SignUpComponent{
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private userSubscription: Subscription | undefined;

  // @Output() userCreated = new EventEmitter<{email:string,password:string}>();
  constructor(private accountService:AccountService,private router:Router,private notify:ToastrService) {  }


  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newUser: User = {
        id: crypto.randomUUID().substring(0, 8),
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.accountService.addUser(newUser).subscribe({
        next: () => {
          this.notify.success('Votre compte est crée', 'Success');
          // this.userCreated.emit({ email: this.email, password: this.password });
          this.router.navigate(['/']).then();
        },
        error: (error) => this.errorMessage = error.message
      });
    }
  }

}
