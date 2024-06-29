import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../model/button-color';
import {TooltipPosition} from '../../model/tooltip-position';
import {NgTooltipPosition} from '../ng-tooltip-position';

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

    protected readonly NgTooltipPosition = NgTooltipPosition;


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


    protected onButtonClick(): void {
        this.click.emit();
    }
}
