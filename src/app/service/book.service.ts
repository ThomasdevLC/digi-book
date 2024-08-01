import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Book {
  title: string;
  author: string;
  description: string;
  status: 'available' | 'borrowed';
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiURL = 'http://localhost:3000/books';
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {}

  addBook(newBook: Book): Observable<Book> {
    return new Observable<Book>((observer) => {
      this.http.post<Book>(this.apiURL, newBook).subscribe({
        next: (book: Book) => {
          const currentBooks = this.booksSubject.value;
          this.booksSubject.next([...currentBooks, book]);
          observer.next(book);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
          observer.complete();
        },
      });
    });
  }
}
