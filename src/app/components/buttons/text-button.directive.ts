import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';


@Directive({
    selector: '[appTextButton]'
})
export class TextButtonDirective extends ButtonBaseDirective implements OnInit, OnChanges {
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
