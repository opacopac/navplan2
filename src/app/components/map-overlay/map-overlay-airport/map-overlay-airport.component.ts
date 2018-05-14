import { Component, OnInit } from '@angular/core';
import { Airport, AirportChart, AirportRunway, AirportType } from '../../../model/airport';
import { Position2d } from '../../../model/position';
import { MapOverlayContainer } from '../map-overlay-container';
import {StringnumberService} from "../../../services/utils/stringnumber.service";
import {DatetimeService} from "../../../services/utils/datetime.service";


@Component({
    selector: 'app-map-overlay-airport',
    templateUrl: './map-overlay-airport.component.html',
    styleUrls: ['./map-overlay-airport.component.css']
})
export class MapOverlayAirportComponent extends MapOverlayContainer implements OnInit {
    public airport: Airport;
    private container: HTMLElement;


    ngOnInit() {
        this.container = document.getElementById('map-overlay-airport-container');
    }


    public bindFeatureData(airport: Airport) {
        this.airport = airport;
    }


    public getContainerHtmlElement() {
        return this.container;
    }


    public getTitle(): string {
        let title = this.airport.name;
        if (this.airport.icao) {
            title += ' (' + this.airport.icao + ')';
        }
        return title;
    }


    public getName(): string {
        if (this.airport.icao) {
            return this.airport.icao;
        } else {
            return this.airport.name;
        }
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


    public getPosition(clickPos: Position2d): Position2d {
        return this.airport.position;
    }


    public getRwyDimensionsString(runway: AirportRunway): string {
        return Math.round(runway.length) + ' x ' + Math.round(runway.width) + 'm';
    }


    public getChartSourceName(chart: AirportChart): string {
        switch (chart.source) {
            case 'AVARE': return 'Avare.ch';
            case 'VFRM': return 'swisstopo';
        }
    }


    public getChartSourceUrl(chart: AirportChart): string {
        switch (chart.source) {
            case 'AVARE': return 'http://www.avare.ch/';
            case 'VFRM': return 'https://www.swisstopo.admin.ch/';
        }
    }


    public getMetarAgeString(): string { // TODO => import
        if (!this.airport.metarTaf || !this.airport.metarTaf.metar_obs_timestamp) {
            return;
        }

        return DatetimeService.getHourMinAgeStringFromMs(this.airport.metarTaf.metar_obs_timestamp);
    }


    public getTafAgeString(): string { // TODO => import
        if (!this.airport.metarTaf || !this.airport.metarTaf.raw_taf) {
            return undefined;
        }

        const matches = this.airport.metarTaf.raw_taf.match(/^TAF( [A-Z]{3})? [A-Z]{4} (\d\d)(\d\d)(\d\d)Z.*$/);

        if (!matches || matches.length !== 5) {
            return undefined;
        }

        const now = new Date();
        const datestring = now.getFullYear() + '-' + StringnumberService.zeroPad(now.getMonth() + 1) +
            '-' + matches[2] + 'T' + matches[3] + ':' + matches[4] + ':00Z';
        const tafFimestamp = Date.parse(datestring);

        return DatetimeService.getHourMinAgeStringFromMs(tafFimestamp);
    }
}
