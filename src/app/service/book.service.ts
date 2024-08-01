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

  /** The constructor */
  constructor(private http: HttpClient) { }

  getBookById(id:string):Observable<Book>{
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }

  updateData(book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${book.id}`, book).pipe(
      map(() => {
        this.booksSubject.next([...this.booksSubject.value.map(b => b.id === book.id ? book : b)]);
      })
    );
  }

}
