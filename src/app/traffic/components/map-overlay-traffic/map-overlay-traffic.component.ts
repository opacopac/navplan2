import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Traffic, TrafficAddressType, TrafficAircraftType} from '../../model/traffic';
import { Position2d } from '../../../shared/model/geometry/position2d';
import { MapOverlayContainer } from '../../../shared/components/map-overlay-container';
import {MapContext} from '../../../map/model/map-context';


const TRAFFIC_TYPE_DESCRIPTION = {
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
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(traffic: Traffic, clickPos: Position2d) {
        this.traffic = traffic;
        this.olOverlay.setPosition(traffic && traffic.hasPositions() ? traffic.getCurrentPosition().position.getMercator() : undefined);
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
        const pos = this.traffic.getCurrentPosition();
        if (pos) {
            return pos.receiver;
        } else {
            return undefined;
        }
    }


    public onFollowSelectedTraffic() {
    }
}
