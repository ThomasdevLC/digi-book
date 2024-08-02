import {Component, OnInit} from '@angular/core';
import {Book, BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{

  book: Book | undefined;

  constructor(private bookService: BookService, private route: ActivatedRoute, protected router: Router) {
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe(book => {
        this.book = book;
      });
    }
  }

}
