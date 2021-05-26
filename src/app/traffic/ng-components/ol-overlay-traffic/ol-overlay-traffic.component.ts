import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Traffic} from '../../domain-model/traffic';
import {TrafficAircraftType} from '../../domain-model/traffic-aircraft-type';
import {TrafficAddressType} from '../../domain-model/traffic-address-type';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {OlOverlayBaseComponent} from '../../../base-map/ng-components/ol-overlay-base.component';
import {TrafficIcon} from '../../domain-model/traffic-icon';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


const TRAFFIC_TYPE_DESCRIPTION = {
    'HELICOPTER_ROTORCRAFT': 'Helicopter',
    'GLIDER': 'Glider',
    'PARACHUTE': 'Parachute',
    'HANG_GLIDER': 'Hang Glider',
    'PARA_GLIDER': 'Paraglider',
    'BALLOON': 'Balloon',
    'AIRSHIP': 'Airship',
    'UNKNOWN': 'Unknown Type',
    'STATIC_OBJECT': 'Static Object',
    'DROP_PLANE': 'Drop Plane',
    'UFO': 'UFO',
    'UAV': 'UAV',
    'JET_AIRCRAFT': 'Jet Aircraft',
    'POWERED_AIRCRAFT': 'Powered Aircraft',
    'TOW_PLANE': 'Tow Plane',
};


@Component({
    selector: 'app-ol-overlay-traffic',
    templateUrl: './ol-overlay-traffic.component.html',
    styleUrls: ['./ol-overlay-traffic.component.css']
})
export class OlOverlayTrafficComponent extends OlOverlayBaseComponent implements OnInit {
    public traffic: Traffic;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(traffic: Traffic, clickPos: Position2d) {
        this.traffic = traffic;
        this.olOverlay.setPosition(traffic && traffic.hasPositions()
            ? OlHelper.getMercator(traffic.getCurrentPosition().position)
            : undefined
        );
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
        if (this.traffic.acType >= 0) {
            return TRAFFIC_TYPE_DESCRIPTION[TrafficAircraftType[this.traffic.acType]];
        } else {
            return 'Unknown Type';
        }
    }


    public getAvatarUrl(): string {
        return TrafficIcon.getUrl(this.traffic.acType, false);
    }


    public getCallsign(): string {
        if (this.traffic.fullCallsign) {
            return this.traffic.callsign + ' (' + this.traffic.fullCallsign + ')';
        } else {
            return this.traffic.callsign;
        }
    }


    public getAddressType(): string {
        return TrafficAddressType[this.traffic.address.type];
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
