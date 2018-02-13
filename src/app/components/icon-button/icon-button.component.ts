import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';


const BUTTON_COLOR_CLASS = {
    'RED': 'btn-danger',
    'ORANGE': 'btn-warning',
    'GREEN': 'btn-success',
    'BLUE': 'btn-info'
};


const BUTTON_SIZE_CLASS = {
    'SMALL': 'btn-sm',
    'LARGE': 'btn-lg'
};


@Component({
    selector: 'app-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {
    @Input() color: string;
    @Input() size: string;
    @Input() iconClass: string;
    @Input() hoverText: string;
    @Output() click = new EventEmitter<boolean>();


    constructor() {
    }


    ngOnInit() {
    }


    public getClass(): string {
        return 'btn ' + BUTTON_COLOR_CLASS[this.color] + ' ' + BUTTON_SIZE_CLASS[this.size];
    }


    public onButtonClicked() {
        this.click.emit(true);
    }
}
