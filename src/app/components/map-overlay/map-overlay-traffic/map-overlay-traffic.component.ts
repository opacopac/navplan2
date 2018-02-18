import { Component, OnInit } from '@angular/core';
import { Traffic, TrafficAddressType } from '../../../model/traffic';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-traffic',
    templateUrl: './map-overlay-traffic.component.html',
    styleUrls: ['./map-overlay-traffic.component.css']
})
export class MapOverlayTrafficComponent implements OnInit, MapOverlayContent {
    public traffic: Traffic;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(traffic: Traffic) {
        this.traffic = traffic;
    }


    public getTitle(): string {
        return 'Traffic';
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.traffic.getCurrentTrafficPosition().position;
    }


    public getAddressType(): string {
        return TrafficAddressType[this.traffic.addresstype];
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
