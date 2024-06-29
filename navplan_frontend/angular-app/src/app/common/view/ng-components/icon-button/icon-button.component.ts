import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: TooltipPosition;
    @Output() public click = new EventEmitter<void>();


    constructor() {
    }


    ngOnInit() {
    }


    public onButtonClick(): void {
        this.click.emit();
    }
}
