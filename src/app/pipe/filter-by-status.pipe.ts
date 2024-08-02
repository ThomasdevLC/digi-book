import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../service/book.service';

@Pipe({
  name: 'filterByStatus',
  standalone: true,
})
export class FilterByStatusPipe implements PipeTransform {
  transform(books: Book[], status: 'available' | 'borrowed' | ''): Book[] {
    if (!books || !status) {
      return books;
    }
    return books.filter((book) => book.status === status);
  }
}
