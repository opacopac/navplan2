import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    @Input() public title: string;
    @Input() public okButtonText: string;
    @Input() public okButtonColor: string;
    @Input() public okButtonIconClass: string;
    @Input() public cancelButtonText: string;
    @Input() public showCancelButton: boolean;
    @Output() public okClicked = new EventEmitter<void>();
    @Output() public cancelClicked = new EventEmitter<void>();


    ngOnInit() {
    }


    protected onOkClicked() {
        this.okClicked.emit();
    }


    protected onCancelClicked() {
        this.cancelClicked.emit();
    }
}
