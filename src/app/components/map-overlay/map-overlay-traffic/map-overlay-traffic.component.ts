import { Component, OnInit } from '@angular/core';
import {Traffic, TrafficAddressType, TrafficAircraftType} from '../../../model/traffic';
import { Position2d } from '../../../model/position';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';
import { MapOverlayContainer } from '../map-overlay-container';


const TRAFFIC_TYPE_DESCRIPTION = {
    'OWN': 'Own Plane',
    'HELICOPTER_ROTORCRAFT': 'Helicopter',
    'GLIDER': 'Glider',
    'PARACHUTE': 'Parachute',
    'HANG_GLIDER': 'Hang Glider',
    'PARA_GLIDER': 'Paraglider',
    'BALLOON': 'Balloon',
    'AIRSHIP': 'Airship',
    'UNKNOWN': 'Unknown',
    'STATIC_OBJECT': 'Static Object',
    'DROP_PLANE': 'Drop Plane',
    'UFO': 'UFO',
    'UAV': 'UAV',
    'JET_AIRCRAFT': 'Jet Aircraft',
    'POWERED_AIRCRAFT': 'Powered Aircraft',
    'TOW_PLANE': 'Tow Plane',
};


@Component({
    selector: 'app-map-overlay-traffic',
    templateUrl: './map-overlay-traffic.component.html',
    styleUrls: ['./map-overlay-traffic.component.css']
})
export class MapOverlayTrafficComponent extends MapOverlayContainer implements OnInit {
    public traffic: Traffic;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    private container: HTMLElement;


    ngOnInit() {
        this.container = document.getElementById('map-overlay-traffic-container');
    }


    public getContainerHtmlElement() {
        return this.container;
    }


    public bindFeatureData(traffic: Traffic) {
        this.traffic = traffic;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.traffic.getCurrentTrafficPosition().position;
    }


    public getTitle(): string {
        const name = this.traffic.getCommonName();
        if (name) {
            return name;
        } else {
            return 'Unknown Traffic';
        }
    }


    public getType(): string {
        if (this.traffic.actype) {
            return TRAFFIC_TYPE_DESCRIPTION[TrafficAircraftType[this.traffic.actype]];
        } else {
            return 'Unknown';
        }
    }


    public getCallsign(): string {
        if (this.traffic.opCallsign) {
            return this.traffic.callsign + ' (' + this.traffic.opCallsign + ')';
        } else {
            return this.traffic.callsign;
        }
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
