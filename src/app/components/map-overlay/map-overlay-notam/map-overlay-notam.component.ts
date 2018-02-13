import { Component, OnInit } from '@angular/core';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { Notam } from '../../../model/notam';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-notam',
    templateUrl: './map-overlay-notam.component.html',
    styleUrls: ['./map-overlay-notam.component.css']
})
export class MapOverlayNotamComponent implements OnInit, MapOverlayContent {
    public notamList: Notam[];


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(notam: Notam) {
        if (!notam) {
            this.notamList = undefined;
        } else {
            this.notamList = [notam];
        }
    }


    public getTitle(): string {
        let title = 'NOTAM ';

        if (this.notamList.length === 1) {
            title += this.notamList[0].id;
        } else if (this.notamList.length > 1) {
            title += 'for ' + this.notamList[0].locationIcao + ' (today & tomorrow)';
        }

        return title;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return clickPos;
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


    private getUtcDate(result): Date {
        const d = new Date(Date.UTC(
            parseInt('20' + result[2], 10),
            parseInt(result[3], 10) - 1,
            parseInt(result[4], 10),
            parseInt(result[5], 10),
            parseInt(result[6], 10)
        ));

        return d;
    }


    private getLtString(date): string {
        const datePart = date.toLocaleDateString();
        const timePart = StringnumberService.zeroPad(date.getHours()) + ':' + StringnumberService.zeroPad(date.getMinutes());
        return datePart + ' ' + timePart + ' UTC+' + Math.round(date.getTimezoneOffset() / -60);
    }


    public getNotamText(notam: Notam): string {
        return notam.fullNotam.replace(/\n/g, '<br />');
    }
}
