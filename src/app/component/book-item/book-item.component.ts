import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book, BookService } from '../../service/book.service';
import { CommonModule } from '@angular/common';
import { FilterByStatusPipe } from '../../pipe/filter-by-status.pipe';
import { StatusPipe } from '../../pipe/status.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule, FilterByStatusPipe, StatusPipe, RouterLink],
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent {
  @Input() book!: Book;
}
