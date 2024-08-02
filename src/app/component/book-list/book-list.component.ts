import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { Book, BookService } from '../../service/book.service';
import { FormsModule } from '@angular/forms';
import { FilterByStatusPipe } from '../../pipe/filter-by-status.pipe';
import { StatusPipe } from '../../pipe/status.pipe';
import { FilterByNamePipe } from '../../pipe/filter-by-name.pipe';
import { BookItemComponent } from '../book-item/book-item.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    FilterByStatusPipe,
    StatusPipe,
    FilterByNamePipe,
    BookItemComponent,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedStatus: 'available' | 'borrowed' | '' = '';
  searchTerm: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks();
    this.bookService.books$.subscribe((books: Book[]) => {
      this.books = books;
    });
  }
  addBook(): void {
    this.router.navigate(['/add']);
  }

  onBookSelected(book: Book): void {
    console.log('Book selected:', book);
    this.router.navigate(['/book-details', book.id]);
  }
}
