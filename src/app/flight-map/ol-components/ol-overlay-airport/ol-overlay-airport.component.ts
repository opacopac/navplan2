import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Airport} from '../../../open-aip/domain-model/airport';
import {Position2d} from '../../../geo-math/domain-model/geometry/position2d';
import {OlAirportIcon} from '../../../open-aip/ol-components/ol-airport-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {WaypointFactory} from '../../../flightroute/domain-model/waypoint-mapper/waypoint-factory';
import {AirportType} from '../../../open-aip/domain-model/airport-type';
import {WmmHelper} from '../../../geo-math/domain-service/wmm-helper';
import {OlBaseMapService} from '../../../base-map/ol-service/ol-base-map.service';


@Component({
    selector: 'app-ol-overlay-airport',
    templateUrl: './ol-overlay-airport.component.html',
    styleUrls: ['./ol-overlay-airport.component.css']
})
export class OlOverlayAirportComponent extends OlOverlayWaypointBase implements OnInit {
    public airport: Airport;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(airport: Airport, clickPos: Position2d) {
        this.airport = airport;
        this.waypoint = airport ? WaypointFactory.createNewWaypointFromDataItem(airport, clickPos) : undefined;
        this.olOverlay.setPosition(airport ? OlBaseMapService.getMercator(airport.position) : undefined);
    }


    public getTitle(): string {
        let title = this.airport.name;
        if (this.airport.icao) {
            title += ' (' + this.airport.icao + ')';
        }
        return title;
    }


    public getAirportTypeString(): string {
        switch (this.airport.type) {
            case AirportType.AD_CLOSED : return 'Closed Aerodrome';
            case AirportType.AD_MIL : return 'Military Aerodrome';
            case AirportType.AF_CIVIL : return 'Civil Airfield';
            case AirportType.AF_MIL_CIVIL : return 'Airfield (civil/military)';
            case AirportType.AF_WATER : return 'Water Airfield';
            case AirportType.APT : return 'Airport resp. Airfield IFR';
            case AirportType.GLIDING : return 'Glider Site';
            case AirportType.HELI_CIVIL : return 'Civil Heliport';
            case AirportType.HELI_MIL : return 'Military Heliport';
            case AirportType.INTL_APT : return 'International Airport';
            case AirportType.LIGHT_AIRCRAFT : return 'Ultra Light Flying Site';
            default : return 'Unknown';
        }
    }


    public getAvatarUrl(): string {
        return OlAirportIcon.getUrl(this.airport.type);
    }


    public getRwyUrl(): string {
        if (!this.airport.hasRunways) {
            return '';
        }

        return OlAirportIcon.getRwyUrl(this.airport, this.airport.runways[0]);
    }


    public getRwyRotDeg(): number {
        if (!this.airport.hasRunways) {
            return 0;
        }

        const rwy = this.airport.runways[0];
        if (rwy.directionContainsMagneticVariation()) {
            return rwy.direction1;
        }
        const magVar = WmmHelper.calcMagneticVariation(this.airport.position);

        return rwy.direction1 + magVar.deg;
    }
}
