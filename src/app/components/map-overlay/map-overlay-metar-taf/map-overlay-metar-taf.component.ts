import { Component, Input, OnInit} from '@angular/core';
import { DatetimeService } from '../../../core/services/utils/datetime.service';
import { StringnumberService } from '../../../core/services/utils/stringnumber.service';
import { MetarTaf } from '../../../model/metar-taf';
import { SessionService } from '../../../core/services/session/session.service';
import { Sessioncontext } from '../../../model/session/sessioncontext';
import {Position2d} from '../../../model/geometry/position2d';



@Component({
  selector: 'app-map-overlay-metar-taf',
  templateUrl: './map-overlay-metar-taf.component.html',
  styleUrls: ['./map-overlay-metar-taf.component.css']
})
export class MapOverlayMetarTafComponent implements OnInit {
    public session: Sessioncontext;
    @Input() metarTaf: MetarTaf;

    constructor(
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public bindFeatureData(metarTaf: MetarTaf) {
        this.metarTaf = metarTaf;
    }


    public getTitle(): string {
        return 'METAR / TAF for ' + this.metarTaf.ad_icao;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.metarTaf.position;
    }


    public getMetarAgeString(): string { // TODO => import
        if (!this.metarTaf.metar_obs_timestamp) {
            return;
        }

        return DatetimeService.getHourMinAgeStringFromMs(this.metarTaf.metar_obs_timestamp);
    }


    public getTafAgeString(): string { // TODO => import
        if (!this.metarTaf.raw_taf) {
            return undefined;
        }

        const matches = this.metarTaf.raw_taf.match(/^TAF( [A-Z]{3})? [A-Z]{4} (\d\d)(\d\d)(\d\d)Z.*$/);

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
