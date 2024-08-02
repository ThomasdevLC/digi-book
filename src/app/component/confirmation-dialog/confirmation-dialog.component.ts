import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  @Input() message: string = 'Etes-vous certain ?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  /** confirmation-dialog ctor */
  onConfirm(){
    this.confirm.emit();
  }

  /** confirmation-dialog ctor */
  onCancel(){
    this.cancel.emit();
  }

}
