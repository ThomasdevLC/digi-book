import {Routes} from '@angular/router';
import {BookListComponent} from './component/book-list/book-list.component';
import {EditBookComponent} from './component/edit-book/edit-book.component';
import {AddBookComponent} from './component/add-book/add-book.component';
import {BookDetailComponent} from "./component/book-detail/book-detail.component";
import {LoginComponent} from "./component/account/login/login.component";
import {SignUpComponent} from "./component/account/sign-up/sign-up.component";
import {AuthGuard} from "./component/account/auth.guard";
import {MyAccountComponent} from "./component/account/my-account/my-account.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'login/:id',component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path:'my-account',component:MyAccountComponent,canActivate: [AuthGuard]},
  {path: 'books', component: BookListComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddBookComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditBookComponent,canActivate: [AuthGuard]},
  {path: 'view/:id', component: BookDetailComponent,canActivate: [AuthGuard]},
];
