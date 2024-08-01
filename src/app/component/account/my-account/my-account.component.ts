import {Component, OnInit} from '@angular/core';
import {AccountService, User} from "../../../service/account.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{
  userData:User | null = null;

  constructor(private accountService:AccountService, private router: Router) {  }

  ngOnInit() {
    this.accountService.getUser().subscribe(user =>{
      this.userData = user;
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/']).then();
  }


}
