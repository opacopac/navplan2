import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-form-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
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
