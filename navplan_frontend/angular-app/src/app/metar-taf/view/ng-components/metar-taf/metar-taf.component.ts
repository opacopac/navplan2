import {Component, Input, OnInit} from '@angular/core';
import {MetarTaf} from '../../../domain/model/metar-taf';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


@Component({
    selector: 'app-metar-taf',
    templateUrl: './metar-taf.component.html',
    styleUrls: ['./metar-taf.component.scss']
})
export class MetarTafComponent implements OnInit {
    @Input() metarTaf: MetarTaf;


    constructor() {
    }


    ngOnInit(): void {
    }


    public getMetarAgeString(): string {
        if (!this.metarTaf.metar_obs_timestamp) {
            return;
        }

        return DatetimeHelper.getHourMinAgeStringFromMs(this.metarTaf.metar_obs_timestamp);
    }


    public getTafAgeString(): string {
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
