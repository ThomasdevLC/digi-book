import {Component, OnInit} from '@angular/core';
import {Book, BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ConfirmationDialogComponent
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit{

  book: Book | undefined;
  showConfirmation:boolean = false;
  confirmationType: 'edit' | 'delete' | null = null;
  confirmationMessage = '';

  constructor(private bookService: BookService, private route: ActivatedRoute, protected router: Router) {
  }

  /** OnInit
   * @description OnInit lifecycle hook
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe(book => {
        this.book = book;
      });
    }
  }

  /** OnConfirm
   * @description OnConfirm method
   */
  onConfirm(): void {
    if (this.confirmationType === 'edit') {
      this.onEditConfirm();
    } else if (this.confirmationType === 'delete') {
      this.onDeleteConfirm();
    }
  }

  /** OnSubmit
   * @description OnSubmit method
   */
  onSubmit(): void {
    this.confirmationMessage = 'Etes vous certain de modifier ces informations ?';
    this.confirmationType = 'edit';
    this.showConfirmation = true;
  }

  /** OnEditConfirm
   * @description OnEditConfirm method
   */
  onEditConfirm(): void {
    if (this.book) {
      this.bookService.updateData(this.book).subscribe(() => {
        this.router.navigate(['/books']).then();
      });
    }
    this.showConfirmation = false;
  }

  /** OnCancel
   * @description OnCancel method
   */
  onCancel(): void {
    this.showConfirmation = false;
  }

  /** OnDelete
   * @description OnDelete method
   */
  onDelete(): void {
    this.confirmationMessage = 'Etes vous certain de supprimer ce livre ?';
    this.confirmationType = 'delete';
    this.showConfirmation = true;
  }

  /** OnDeleteConfirm
   * @description OnDeleteConfirm method
   */
  onDeleteConfirm(): void {
    if (this.book) {
      this.bookService.removeBook(this.book.id).subscribe(() => {
        this.router.navigate(['/books']).then();
      });
    }
    this.showConfirmation = false;
  }

}
