import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-confirm-delete-dialog',
    templateUrl: './confirm-delete-dialog.component.html',
    styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
    @Input() public title: string;
    @Output() public deleteClicked = new EventEmitter<void>();
    @Output() public cancelClicked = new EventEmitter<void>();


    ngOnInit() {
    }


    protected onDeleteClicked() {
        this.deleteClicked.emit();
    }


    protected onCancelClicked() {
        this.cancelClicked.emit();
    }
}
