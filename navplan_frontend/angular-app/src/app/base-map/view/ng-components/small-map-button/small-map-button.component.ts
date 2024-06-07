import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-small-map-button',
    templateUrl: './small-map-button.component.html',
    styleUrls: ['./small-map-button.component.scss']
})
export class SmallMapButtonComponent implements OnInit {
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: string;
    @Input() public isButtonPressed: boolean;
    @Output() public buttonClickedEventEmitter = new EventEmitter<void>();


    constructor() {
    }


    ngOnInit() {
    }


    public getColor(): string {
        return this.isButtonPressed
            ? 'mapbutton-status-ok'
            : 'mapbutton-primary';
    }


    public onButtonClick(): void {
        this.buttonClickedEventEmitter.emit();
    }
}
