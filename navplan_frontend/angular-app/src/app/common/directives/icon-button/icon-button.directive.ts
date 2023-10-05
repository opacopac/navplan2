import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {ButtonBaseDirective} from '../button-base/button-base.directive';


@Directive({
    selector: '[appIconButton]'
})
export class IconButtonDirective extends ButtonBaseDirective implements OnInit, OnChanges {
    @Input() public iconClass: string;


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
        return '<span class="' + this.iconClass + '"></span>';
    }
}
