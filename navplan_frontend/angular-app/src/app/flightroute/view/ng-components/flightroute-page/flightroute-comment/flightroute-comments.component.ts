import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-flightroute-comments',
    templateUrl: './flightroute-comments.component.html',
    styleUrls: ['./flightroute-comments.component.scss']
})
export class FlightrouteCommentsComponent implements OnInit {
    @Input() public routeComments: string;
    @Output() public routeCommentsChanged = new EventEmitter<string>();


    constructor() {
    }


    ngOnInit() {
    }


    protected onRouteCommentsChanged(routeComments: string) {
        this.routeCommentsChanged.emit(this.routeComments);
    }
}
