import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book, BookService } from '../../service/book.service';
import { FormsModule } from '@angular/forms';
import { FilterByStatusPipe } from '../../pipe/filter-by-status.pipe';
import { StatusPipe } from '../../pipe/status.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    FilterByStatusPipe,
    StatusPipe,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedStatus: 'available' | 'borrowed' | '' = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks();
    this.bookService.books$.subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}
