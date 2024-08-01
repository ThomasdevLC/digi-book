import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, switchMap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private usersUrl = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${email}`).pipe(
      map(users => users.length > 0)
    );
  }

  /** Add a new user
   * @param user The user to add
   * @returns An observable that emits the user
   * @description This method will make a POST request to the server to add the user
   */
  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.usersUrl, user);
  // }
  // src/app/service/account.service.ts
  addUser(user: User): Observable<User> {
    return this.emailExists(user.email).pipe(
      map(exists => {
        if (exists) {
          throw new Error('Erreur sur le mot de passe ou le mail');
        }
        return user;
      }),
      switchMap(() => this.http.post<User>(this.usersUrl, user))
    );
  }

  /** Login a user
   * @param email The email of the user
   * @param password The password of the user
   * @returns An observable that emits the user
   * @description This method will make a GET request to the server to get the user with the specified email and password
   * If the user is found, it will be stored in the local storage and emitted by the userSubject
   * If the user is not found, an error will be thrown
   * If an error occurs, it will be caught and rethrown
   */
  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${email}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            if (user.password === password) {
              localStorage.setItem('loggedInUser', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
            } else {
              throw new Error('Invalid email or password');
            }
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError(this.loginError)
      );
  }

  /** Check if a user is logged in
   * @returns A boolean indicating if the user is logged in
   * @description This method will return true if the user is logged in, false otherwise
   * The user is considered logged in if the userSubject emits a non-null value
   */
  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  /** Get the current user
   * @returns An observable that emits the user
   * @description This method will return an observable that emits the current user
   */
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  /** Logout the current user
   * @description This method will remove the current user from the local storage and emit null
   */
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.userSubject.next(null);
  }

  /** Handle login errors
   * @param error The error that occurred
   * @returns An observable that emits an error
   * @description This method will catch an error that occurred during login and rethrow it as an observable
   */
  private loginError(error: HttpErrorResponse) {
    return throwError(() => new Error('Invalid email or password'));
  }
}
