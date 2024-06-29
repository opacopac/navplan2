import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-trash-icon-button',
    templateUrl: './trash-icon-button.component.html',
    styleUrls: ['./trash-icon-button.component.scss']
})
export class TrashIconButtonComponent implements OnInit {
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
    @Output() public buttonClickedEventEmitter = new EventEmitter<void>();


    constructor() {
    }


    ngOnInit() {
    }


    public onButtonClick(): void {
        this.buttonClickedEventEmitter.emit();
    }
}
