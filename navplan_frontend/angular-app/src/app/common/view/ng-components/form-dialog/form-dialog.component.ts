import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
    @Input() public title: string;
    @Input() public isFormValid: boolean;
    @Input() public saveButtonText: string;
    @Input() public cancelButtonText: string;
    @Input() public deleteButtonText: string;
    @Input() public showDeleteButton: boolean;
    @Output() public saveClicked = new EventEmitter<void>();
    @Output() public cancelClicked = new EventEmitter<void>();
    @Output() public deleteClicked = new EventEmitter<void>();


    ngOnInit() {
    }


    protected onSaveClicked() {
        this.saveClicked.emit();
    }


    protected onCancelClicked() {
        this.cancelClicked.emit();
    }


    protected onDeleteClicked() {
        this.deleteClicked.emit();
    }
}
