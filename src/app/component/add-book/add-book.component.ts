import { Component } from '@angular/core';
import { BookService, Book } from '../../service/book.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { computeMsgId } from '@angular/compiler';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {

  newBook: Book = {
    id: crypto.randomUUID(),
    title: '',
    author: '',
    description: '',
    status: 'available',
  };
  errorMessage: string | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit() {
    if (
      !this.newBook.title ||
      !this.newBook.author ||
      !this.newBook.description ||
      !this.newBook.status
    ) {
      this.errorMessage = 'Vous devez renseigner tous les champs.';
      return;
    }

    this.errorMessage = null;

    this.bookService.addBook(this.newBook).subscribe({
      next: (book) => {
        console.log('Book added:', book);

        this.newBook = {
          id: '',
          title: '',
          author: '',
          description: '',
          status: 'available',
        };
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error adding book:', err);
        this.errorMessage = 'Error adding book';
      },
    });
  }
}
