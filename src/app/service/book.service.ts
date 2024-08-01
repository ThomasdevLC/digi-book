import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  status: 'available' | 'borrowed';
}
@Injectable({
  providedIn: 'root'
})
export class BookService {

  /** The URL of the API */
  private apiURL = 'http://localhost:3000/books';
  /** The subject that emits the books */
  private booksSubject = new BehaviorSubject<Book[]>([]);

  /**
   * Constructor of the service to inject the HTTP client
   * @param http The HTTP client to make requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Get all books from the server
   * @param id The id of the todo to get
   * @returns An observable that emits the books
   */
  getBookById(id:string):Observable<Book>{
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }

  /**
   * Get all books from the server
   * @param book The book to add
   * @returns An observable that emits the books
   */
  updateData(book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${book.id}`, book).pipe(
      map(() => {
        this.booksSubject.next([...this.booksSubject.value.map(b => b.id === book.id ? book : b)]);
      })
    );
  }

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

  /**
   * delete a book from the server
   * @param id The id of the book to delete
   * @returns An observable that emits the books
   */
  removeBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      map(() => {
        this.booksSubject.next([...this.booksSubject.value.filter(b => b.id !== id)]);
      })
    );
  }
}
