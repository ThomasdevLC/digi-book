import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Subscription} from "rxjs";
import {AccountService} from "../../service/account.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,OnDestroy {
  isLoggedIn = false;
  private userSubscription: Subscription | undefined;
  constructor(private accountService:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.userSubscription = this.accountService.getUser().subscribe(user =>{
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/']).then();
  }

}
