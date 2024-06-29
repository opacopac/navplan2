import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-mini-fab-button',
    templateUrl: './mini-fab-button.component.html',
    styleUrls: ['./mini-fab-button.component.scss']
})
export class MiniFabButtonComponent implements OnInit {
    @Input() public color: 'red' | 'green' | 'blue' | 'orange';
    @Input() public disabled: boolean;
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
    @Output() public buttonClickedEventEmitter = new EventEmitter<void>();


    constructor() {
    }


    ngOnInit() {
    }


    public getColor(): string {
        switch (this.color) {
            case 'green':
                return 'button-green';
            case 'blue':
                return 'button-blue';
            case 'orange':
                return 'button-orange';
            case 'red':
                return 'button-red';
            default:
                return 'accent';
        }
    }


    public onButtonClick(): void {
        this.buttonClickedEventEmitter.emit();
    }
}
