import {Directive, ElementRef, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ButtonBaseDirective} from './button-base.directive';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Directive({
    selector: '[appTextButton]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextButtonDirective),
        multi: true
    }]
})
export class TextButtonDirective extends ButtonBaseDirective implements OnInit, OnChanges, ControlValueAccessor {
    @Input() public iconClass: string;
    @Input() public buttonText: string;


    constructor(protected el: ElementRef) {
        super(el);
    }


    ngOnInit() {
        super.ngOnInit();
    }


    ngOnChanges() {
        super.ngOnChanges();
        this.el.nativeElement.innerHTML = this.getInnerHtml();
    }


    private getInnerHtml(): string {
        const iconPart = this.iconClass ? '<span class="' + this.iconClass + '"></span> ' : '';
        return iconPart + this.buttonText;
    }
}
