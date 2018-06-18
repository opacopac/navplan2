import {Directive, ElementRef, forwardRef, HostBinding, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


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
    selector: '[appButtonBase]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ButtonBaseDirective),
        multi: true
    }]
})
export class ButtonBaseDirective implements OnInit, OnChanges, ControlValueAccessor {
    @Input() public size: ButtonSize;
    @Input() public color: ButtonColor;
    @Input() public isDisabled: boolean;
    @Input() public isPressed: boolean;
    @Input() public isToggle = false;
    @HostBinding('class') protected class: string;
    private propagateChange = (_: any) => {};


    constructor(protected el: ElementRef) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.class = this.getClass();
    }


    public writeValue(value: boolean) {
        if (value !== undefined) {
            this.isPressed = value;
        }
        this.ngOnChanges();
    }


    public registerOnChange(callback: (_: any) => void) {
        this.propagateChange = callback;
    }


    public registerOnTouched() {
    }



    @HostListener('click') protected onClick() {
        this.isPressed = this.isToggle ? !this.isPressed : false;
        this.ngOnChanges();
        this.propagateChange(this.isPressed);
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
