import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonStatus} from '../../model/button-status';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-status-button',
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule
    ],
    templateUrl: './status-button.component.html',
    styleUrls: ['./status-button.component.scss']
})
export class StatusButtonComponent implements OnInit {
    @Input() public buttonFormat: 'small_square' | 'small_round' | 'large' = 'large';
    @Input() public tooltipText: string;
    @Input() public tooltipPosition: TooltipPosition;
    @Input() public buttonStatus: ButtonStatus = ButtonStatus.OFF;
    @Output() public buttonClicked = new EventEmitter<void>();

    @Input() set toggleOnOff(status: boolean) {
        if (status) {
            this.buttonStatus = ButtonStatus.ON;
        } else {
            this.buttonStatus = ButtonStatus.OFF;
        }
    }


    constructor() {
    }


    ngOnInit() {
    }


    public getColor(): string {
        switch (this.buttonStatus) {
            case ButtonStatus.ON:
                return 'button-status-ok';
            case ButtonStatus.WARNING:
                return 'button-status-warn';
            case ButtonStatus.ERROR:
                return 'button-status-error';
            case ButtonStatus.OFF:
            default:
                return 'button-primary';
        }
    }


    public onButtonClick(): void {
        this.buttonClicked.emit();
    }
}
