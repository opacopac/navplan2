import {Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit} from '@angular/core';


export enum ButtonSize {
    XS,
    SMALL,
    MEDIUM,
    LARGE
}


export enum ButtonColor {
    RED,
    ORANGE,
    GREEN,
    BLUE,
    GRAY,
    BLACK
}


@Directive({
    selector: '[appButtonBase]'
})
export abstract class ButtonBaseDirective implements OnInit, OnChanges {
    @Input() size: ButtonSize;
    @Input() color: ButtonColor;
    @Input() isDisabled: boolean;
    @Input() isPressed: boolean;
    @HostBinding('class') protected class: string;


    constructor(protected el: ElementRef) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.class = this.getClass();
    }


    @HostListener('click') protected onClick() {
        this.el.nativeElement.blur(); // immediately remove focus
    }


    protected getClass(): string {
        const activeClass = this.isPressed ? ' active' : '';
        const disabledClass = this.isDisabled ? ' disabled' : '';
        return 'btn ' + this.getColorClass() + ' ' + this.getSizeClass() + activeClass + disabledClass;
    }


    protected getSizeClass(): string {
        switch (this.size) {
            case ButtonSize.XS:
                return 'btn-xs';
            case ButtonSize.SMALL:
                return 'btn-sm';
            case ButtonSize.LARGE:
                return 'btn-lg';
            case ButtonSize.MEDIUM:
            default:
                return 'btn-md';
        }
    }


    protected getColorClass(): string {
        switch (this.color) {
            case ButtonColor.RED:
                return 'btn-danger';
            case ButtonColor.ORANGE:
                return 'btn-warning';
            case ButtonColor.GREEN:
                return 'btn-success';
            case ButtonColor.BLUE:
                return 'btn-info';
            case ButtonColor.GRAY:
                return 'btn-secondary';
            case ButtonColor.BLACK:
            default:
                return 'btn-primary';
        }
    }
}
