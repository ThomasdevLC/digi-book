import {Component, OnInit} from '@angular/core';
import {Book, BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit{

  book: Book | undefined;

  constructor(private bookService: BookService, private route: ActivatedRoute, protected router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe(book => {
        this.book = book;
      });
    }
  }

  onSubmit(): void {
    if (this.book) {
      this.bookService.updateData(this.book).subscribe(() => {
        this.router.navigate(['/']).then();
      });
    }
  }

}
