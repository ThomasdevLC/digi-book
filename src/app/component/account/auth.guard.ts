import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AccountService} from "../../service/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  /** The method that checks if the user is authenticated
   * @returns An observable that emits true if the user is authenticated, false otherwise
   */
  canActivate(): Observable<boolean> {
    return this.accountService.getUser().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/']).then();
          return false;
        }
      })
    );
  }
}
