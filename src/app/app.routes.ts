import { Routes } from '@angular/router';
import {BookListComponent} from "./component/book-list/book-list.component";
import {EditBookComponent} from "./component/edit-book/edit-book.component";

export const routes: Routes = [
  {path:'',component:BookListComponent},
  {path:'edit/:id',component:EditBookComponent}

];
