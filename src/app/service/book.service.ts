import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
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

}
