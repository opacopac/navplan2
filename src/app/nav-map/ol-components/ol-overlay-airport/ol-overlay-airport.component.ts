import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Airport, AirportChart, AirportRunway, AirportType} from '../../../map-features/model/airport';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {DatetimeService} from '../../../shared/services/datetime/datetime.service';
import {OlOverlayWindyiframeComponent} from '../ol-overlay-windyiframe/ol-overlay-windyiframe.component';
import {AirportIcon} from '../../../map-features/model/airport-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {Waypoint} from '../../../flightroute/model/waypoint';
import {WaypointFactory} from '../../../flightroute/model/waypoint-mapper/waypoint-factory';


@Component({
    selector: 'app-ol-overlay-airport',
    templateUrl: './ol-overlay-airport.component.html',
    styleUrls: ['./ol-overlay-airport.component.css']
})
export class OlOverlayAirportComponent extends OlOverlayWaypointBase implements OnInit {
    public airport: Airport;
    public waypoint: Waypoint;
    public isMeteoGramOpenClicked: boolean;
    @ViewChild('container') container: ElementRef;
    @ViewChild(OlOverlayWindyiframeComponent) windyComponent: OlOverlayWindyiframeComponent;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(airport: Airport, clickPos: Position2d) {
        this.airport = airport;
        this.waypoint = airport ? WaypointFactory.createNewWaypointFromDataItem(airport, clickPos) : undefined;
        this.isMeteoGramOpenClicked = false;
        this.olOverlay.setPosition(airport ? airport.position.getMercator() : undefined);

        this.activateTab();
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


    public getAvatarUrl(): string {
        return AirportIcon.getUrl(this.airport.type);
    }


    public getRwyColumns(): string[] {
        return ['runway', 'surface', 'dimensions', 'tora', 'lda', 'papi'];
    }


    public getRadioColumns(): string[] {
        return ['type', 'frequency'];
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


    public showMeteogram() {
        this.isMeteoGramOpenClicked = true;
        this.updateMeteogram();
    }


    public updateMeteogram() {
        if (this.airport && this.windyComponent) {
            this.windyComponent.updateWeather(this.airport.position, this.containerHtmlElement.offsetWidth);
        }
    }


    public isMeteoGramVisible(): boolean {
        if (!this.airport) {
            return false;
        } else if (this.isMeteoGramOpenClicked) {
            return true;
        } else if (!this.airport.metarTaf) {
            return true;
        } else {
            return false;
        }
    }


    private activateTab(tabName: string = 'TODO') {
    }
}
