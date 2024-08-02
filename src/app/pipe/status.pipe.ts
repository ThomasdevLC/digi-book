import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'available':
        return 'disponible';
      case 'borrowed':
        return 'emprunté';
      default:
        return value;
    }
  }

}
