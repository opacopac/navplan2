import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../model/button-color';

@Component({
    selector: 'app-mini-fab-button',
    templateUrl: './mini-fab-button.component.html',
    styleUrls: ['./mini-fab-button.component.scss']
})
export class MiniFabButtonComponent implements OnInit {
    @Input() public color: ButtonColor;
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
            case ButtonColor.GREEN:
                return 'button-green';
            case ButtonColor.ORANGE:
                return 'button-orange';
            case ButtonColor.RED:
                return 'button-red';
            case ButtonColor.BLUE:
            default:
                return 'button-blue';
        }
    }


    public onButtonClick(): void {
        this.buttonClickedEventEmitter.emit();
    }
}
