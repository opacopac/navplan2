import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapButtonStatus} from '../../../domain/model/map-button-status';

@Component({
    selector: 'app-map-status-button',
    templateUrl: './map-status-button.component.html',
    styleUrls: ['./map-status-button.component.scss']
})
export class MapStatusButtonComponent implements OnInit {
    @Input() public buttonFormat: 'small_square' | 'small_round' | 'large' = 'large';
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
    @Input() public buttonStatus: MapButtonStatus = MapButtonStatus.OFF;
    @Output() public buttonClickedEventEmitter = new EventEmitter<void>();

    @Input() set toggleOnOff(status: boolean) {
        if (status) {
            this.buttonStatus = MapButtonStatus.ON;
        } else {
            this.buttonStatus = MapButtonStatus.OFF;
        }
    }


    constructor() {
    }


    ngOnInit() {
    }


    public getColor(): string {
        switch (this.buttonStatus) {
            case MapButtonStatus.ON:
                return 'mapbutton-status-ok';
            case MapButtonStatus.WARNING:
                return 'mapbutton-status-warn';
            case MapButtonStatus.ERROR:
                return 'mapbutton-status-error';
            case MapButtonStatus.OFF:
            default:
                return 'mapbutton-primary';
        }
    }


    public onButtonClick(): void {
        this.buttonClickedEventEmitter.emit();
    }
}
