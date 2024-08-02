import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
  standalone: true,
})
export class FilterByNamePipe implements PipeTransform {
  transform(books: any[], searchTerm: string): any[] {
    if (!books || !searchTerm) {
      return books;
    }
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
