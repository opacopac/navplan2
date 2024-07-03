import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {ButtonColor} from '../../model/button-color';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
    @Input() public color: ButtonColor;
    @Input() public disabled: boolean;
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: TooltipPosition;
    @Output() public buttonClicked = new EventEmitter<void>();


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


    public onButtonClick(): void {
        this.buttonClicked.emit();
    }
}
