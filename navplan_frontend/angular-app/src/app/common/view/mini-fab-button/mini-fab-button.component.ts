import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../model/button-color';
import {TooltipPosition} from '../../model/tooltip-position';

@Component({
    selector: 'app-mini-fab-button',
    templateUrl: './mini-fab-button.component.html',
    styleUrls: ['./mini-fab-button.component.scss']
})
export class MiniFabButtonComponent implements OnInit {
    @Input() public color: ButtonColor;
    @Input() public disabled: boolean;
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: TooltipPosition;
    @Output() public click = new EventEmitter<void>();


    constructor() {
    }


    ngOnInit() {
    }


    protected getColor(): string {
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


    protected getTooltipPosition(): 'left' | 'right' | 'above' | 'below' | 'before' | 'after' {
        switch (this.tooltipPosition) {
            case TooltipPosition.LEFT:
                return 'left';
            case TooltipPosition.RIGHT:
                return 'right';
            case TooltipPosition.ABOVE:
                return 'above';
            case TooltipPosition.BELOW:
                return 'below';
            case TooltipPosition.BEFORE:
                return 'before';
            case TooltipPosition.AFTER:
            default:
                return 'after';
        }
    }


    protected onButtonClick(): void {
        this.click.emit();
    }
}
