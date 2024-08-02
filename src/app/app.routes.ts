import { Routes } from '@angular/router';
import { BookListComponent } from './component/book-list/book-list.component';
import { EditBookComponent } from './component/edit-book/edit-book.component';
import { AddBookComponent } from './component/add-book/add-book.component';
import {BookDetailComponent} from "./component/book-detail/book-detail.component";

export const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path:'view/:id', component: BookDetailComponent },
];
