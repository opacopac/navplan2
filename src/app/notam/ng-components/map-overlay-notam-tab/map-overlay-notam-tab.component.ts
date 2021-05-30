import {Component, Input, OnInit} from '@angular/core';
import {Notam} from '../../domain-model/notam';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';


@Component({
    selector: 'app-map-overlay-notam-tab',
    templateUrl: './map-overlay-notam-tab.component.html',
    styleUrls: ['./map-overlay-notam-tab.component.css']
})
export class MapOverlayNotamTabComponent implements OnInit {
    @Input() notams: Notam[];


    constructor() {
    }


    ngOnInit() {
    }


    public getNotamColumns(): string[] {
        return ['fullNotam'];
    }


    public getNotamTitle(notam: Notam): string {
        if (!notam || !notam.isIcaoFormat) {
            return '';
        } else if (notam.qCode.indexOf('XX') === 0) {
            return '';
        } else if (notam.qCode.indexOf('XX') === 2) {
            return notam.subject;
        } else {
            return notam.subject + ' ' + notam.modifier;
        }
    }


    public getNotamText(notam: Notam): string {
        return notam.fullNotam.replace(/\n/g, '<br />');
    }


    public getNotamValidity(notam: Notam): string {
        let fromText, tillText: string;

        // TODO: move date parsing to import
        if (notam.isIcaoFormat) {
            const timeRegFrom = /\sB\)\s+((\d\d)(\d\d)(\d\d)(\d\d)(\d\d))\s/im;
            const result1 = notam.fullNotam.match(timeRegFrom);

            const timeRegTill = /\sC\)\s+((\d\d)(\d\d)(\d\d)(\d\d)(\d\d)|PERM)\s/im;
            const result2 = notam.fullNotam.match(timeRegTill);

            if (result1 && result2) {
                const d1 = this.getUtcDate(result1);
                fromText = this.getLtString(d1);

                if (result2[1] !== 'PERM') {
                    const d2 = this.getUtcDate(result2);
                    tillText = this.getLtString(d2);
                } else {
                    tillText = result2[1];
                }
            }
        } else {
            fromText = new Date(notam.startDate).toLocaleDateString();
            tillText = new Date(notam.endDate).toLocaleDateString();
        }

        return '(' + fromText + ' - ' + tillText + ')';
    }


    public getUtcDate(result): Date {
        return new Date(Date.UTC(
            parseInt('20' + result[2], 10),
            parseInt(result[3], 10) - 1,
            parseInt(result[4], 10),
            parseInt(result[5], 10),
            parseInt(result[6], 10)
        ));
    }


    public getLtString(date): string {
        const datePart = date.toLocaleDateString();
        const timePart = StringnumberHelper.zeroPad(date.getHours()) + ':' + StringnumberHelper.zeroPad(date.getMinutes());
        return datePart + ' ' + timePart + ' LT'; // + Math.round(date.getTimezoneOffset() / -60);
    }


    /*public getTimezoneOffsetString(): string {
    const d = new Date();
    const offset = -Math.round(d.getTimezoneOffset() / 6.0) / 10.0;
    return 'UTC' + (offset >= 0 ? '+' : '') + offset;
    }*/
}
