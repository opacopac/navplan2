import { Component, Input, OnInit } from '@angular/core';
import { Traffic } from '../../../model/traffic';


@Component({
    selector: 'app-map-overlay-traffic',
    templateUrl: './map-overlay-traffic.component.html',
    styleUrls: ['./map-overlay-traffic.component.css']
})
export class MapOverlayTrafficComponent implements OnInit {
    @Input() traffic: Traffic;


    constructor() {
    }


    ngOnInit() {
    }


    public getReceiver(): string {
        const pos = this.traffic.getCurrentTrafficPosition();
        if (pos) {
            return pos.receiver;
        } else {
            return undefined;
        }
    }


    public onFollowSelectedTraffic() {
    }
}
