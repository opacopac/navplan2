import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TooltipPosition} from '../../model/tooltip-position';
import {NgTooltipPosition} from '../ng-tooltip-position';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: TooltipPosition;
    @Output() public buttonClickedEventEmitter = new EventEmitter<void>();

    protected readonly NgTooltipPosition = NgTooltipPosition;


    constructor() {
    }


    ngOnInit() {
    }


    public onButtonClick(): void {
        this.buttonClickedEventEmitter.emit();
    }
}
