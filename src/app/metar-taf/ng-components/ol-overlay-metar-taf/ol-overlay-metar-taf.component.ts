import {Component, Input, OnInit} from '@angular/core';
import {DatetimeHelper} from '../../../system/domain-service/datetime/datetime-helper';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {MetarTaf} from '../../domain-model/metar-taf';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';


@Component({
  selector: 'app-ol-overlay-metar-taf',
  templateUrl: './ol-overlay-metar-taf.component.html',
  styleUrls: ['./ol-overlay-metar-taf.component.css']
})
export class OlOverlayMetarTafComponent implements OnInit {
    @Input() metarTaf: MetarTaf;


    ngOnInit() {
    }


    public bindFeatureData(metarTaf: MetarTaf) {
        this.metarTaf = metarTaf;
    }


    public getTitle(): string {
        return 'METAR / TAF for ' + this.metarTaf.ad_icao;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return undefined;
        //return this.metarTaf.position;
    }


    public getMetarAgeString(): string { // TODO => import
        if (!this.metarTaf.metar_obs_timestamp) {
            return;
        }

        return DatetimeHelper.getHourMinAgeStringFromMs(this.metarTaf.metar_obs_timestamp);
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
        const datestring = now.getFullYear() + '-' + StringnumberHelper.zeroPad(now.getMonth() + 1) +
            '-' + matches[2] + 'T' + matches[3] + ':' + matches[4] + ':00Z';
        const tafFimestamp = Date.parse(datestring);

        return DatetimeHelper.getHourMinAgeStringFromMs(tafFimestamp);
    }
}
