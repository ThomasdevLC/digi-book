import { Routes } from '@angular/router';
import { BookListComponent } from './component/book-list/book-list.component';
import { EditBookComponent } from './component/edit-book/edit-book.component';
import { AddBookComponent } from './component/add-book/add-book.component';

export const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit/:id', component: EditBookComponent },
];
