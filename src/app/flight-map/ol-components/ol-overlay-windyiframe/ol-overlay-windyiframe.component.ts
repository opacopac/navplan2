import {Component, Input, OnInit} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {ReplaySubject} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
    selector: 'app-ol-overlay-windyiframe',
    templateUrl: './ol-overlay-windyiframe.component.html',
    styleUrls: ['./ol-overlay-windyiframe.component.css']
})
export class OlOverlayWindyiframeComponent implements OnInit {
    public readonly windyUrl$: ReplaySubject<SafeResourceUrl> = new ReplaySubject();
    @Input() set position(value: Position2d) {
        if (value) {
            const newUrl = this.getWindyUrl(value);
            this.windyUrl$.next(newUrl);
        }
    }


    constructor(private sanitizer: DomSanitizer) {
    }


    ngOnInit() {
    }


    private getWindyUrl(position: Position2d): SafeResourceUrl {
        const url = 'https://embed.windy.com/embed2.html' +
            '?lat=' + position.latitude +
            '&lon=' + position.longitude +
            '&detailLat=' + position.latitude +
            '&detailLon=' + position.longitude +
            '&width=650' +
            '&height=450' +
            '&zoom=9' +
            '&level=surface' +
            '&overlay=wind' +
            '&product=ecmwf' +
            '&menu=' +
            '&message=' +
            '&marker=' +
            '&calendar=now' +
            '&pressure=' +
            '&type=map' +
            '&location=coordinates' +
            '&detail=true' +
            '&metricWind=kt' +
            '&metricTemp=%C2%B0C' +
            '&radarRange=-1';

        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
