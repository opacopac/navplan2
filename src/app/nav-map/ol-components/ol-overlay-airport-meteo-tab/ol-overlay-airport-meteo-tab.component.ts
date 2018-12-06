import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatetimeService} from '../../../shared/services/datetime/datetime.service';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {Airport} from '../../../map-features/model/airport';
import {OlOverlayWindyiframeComponent} from '../ol-overlay-windyiframe/ol-overlay-windyiframe.component';

@Component({
    selector: 'app-ol-overlay-airport-meteo-tab',
    templateUrl: './ol-overlay-airport-meteo-tab.component.html',
    styleUrls: ['./ol-overlay-airport-meteo-tab.component.css']
})
export class OlOverlayAirportMeteoTabComponent implements OnInit {
    public isMeteoGramOpenClicked: boolean;
    @Input() airport: Airport;
    @ViewChild(OlOverlayWindyiframeComponent) windyComponent: OlOverlayWindyiframeComponent;


    constructor() {
    }


    ngOnInit() {
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


    public getName(): string {
        if (this.airport.icao) {
            return this.airport.icao;
        } else {
            return this.airport.name;
        }
    }


    public showMeteogram() {
        this.isMeteoGramOpenClicked = true;
        this.updateMeteogram();
    }


    public updateMeteogram() {
        if (this.airport && this.windyComponent) {
            // this.windyComponent.updateWeather(this.airport.position, this.containerHtmlElement.offsetWidth);
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
}
