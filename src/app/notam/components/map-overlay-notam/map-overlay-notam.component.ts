import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StringnumberService } from '../../../shared/services/stringnumber/stringnumber.service';
import { Notam } from '../../model/notam';
import { Position2d } from '../../../shared/model/geometry/position2d';
import { MapOverlayContainer } from '../../../shared/components/map-overlay-container';
import {MapContext} from '../../../map/model/map-context';


@Component({
    selector: 'app-map-overlay-notam',
    templateUrl: './map-overlay-notam.component.html',
    styleUrls: ['./map-overlay-notam.component.css']
})
export class MapOverlayNotamComponent extends MapOverlayContainer implements OnInit {
    public notam: Notam;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(notam: Notam, clickPos: Position2d) {
        this.notam = notam;
    }


    public getNotamTitle(): string {
        if (!this.notam || !this.notam.isIcaoFormat) {
            return '';
        } else if (this.notam.qCode.indexOf('XX') === 0) {
            return '';
        } else if (this.notam.qCode.indexOf('XX') === 2) {
            return this.notam.subject;
        } else {
            return this.notam.subject + ' ' + this.notam.modifier;
        }
    }


    public getNotamText(): string {
        return this.notam.fullNotam.replace(/\n/g, '<br />');
    }


    public getNotamValidity(): string {
        let fromText, tillText: string;

        // TODO: move date parsing to import
        if (this.notam.isIcaoFormat) {
            const timeRegFrom = /\sB\)\s+((\d\d)(\d\d)(\d\d)(\d\d)(\d\d))\s/im;
            const result1 = this.notam.fullNotam.match(timeRegFrom);

            const timeRegTill = /\sC\)\s+((\d\d)(\d\d)(\d\d)(\d\d)(\d\d)|PERM)\s/im;
            const result2 = this.notam.fullNotam.match(timeRegTill);

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
            fromText = new Date(this.notam.startDate).toLocaleDateString();
            tillText = new Date(this.notam.endDate).toLocaleDateString();
        }

        return '(' + fromText + ' - ' + tillText + ')';
    }


    public getTimezoneOffsetString(): string {
        const d = new Date();
        const offset = -Math.round(d.getTimezoneOffset() / 6.0) / 10.0;
        return 'UTC' + (offset >= 0 ? '+' : '') + offset;
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
        return datePart + ' ' + timePart + ' LT'; // + Math.round(date.getTimezoneOffset() / -60);
    }
}
