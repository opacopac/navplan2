import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { ButtonColor } from '../button-base/button-base.directive';
import { IconButtonDirective } from '../icon-button/icon-button.directive';


export enum ButtonStatus {
    OK,
    WARNING,
    ERROR,
    OFF
}


@Directive({
    selector: '[appStatusButton]'
})
export class StatusButtonDirective extends IconButtonDirective implements OnInit, OnChanges {
    @Input() public status: ButtonStatus;


    constructor(protected el: ElementRef) {
        super(el);
    }


    ngOnInit() {
        super.ngOnInit();
    }


    ngOnChanges() {
        this.color = this.getStatusColor();
        super.ngOnChanges();
    }


    private getStatusColor(): ButtonColor {
        switch (this.status) {
            case ButtonStatus.OK:
                return ButtonColor.GREEN;
            case ButtonStatus.WARNING:
                return ButtonColor.ORANGE;
            case ButtonStatus.ERROR:
                return ButtonColor.RED;
            case ButtonStatus.OFF:
            default:
                return ButtonColor.GRAY;
        }
    }
}
