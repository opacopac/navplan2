import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-navplan-dialog',
    templateUrl: './navplan-dialog.component.html',
    styleUrls: ['./navplan-dialog.component.scss']
})
export class NavplanDialogComponent implements OnInit {
    @Input() public title: string;
    @Input() public isFormValid: boolean;
    @Input() public saveButtonText: string;
    @Input() public cancelButtonText: string;
    @Input() public deleteButtonText: string;
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
