import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Position2d} from '../../../shared/model/geometry/position2d';


@Component({
    selector: 'app-ol-overlay-windyiframe',
    templateUrl: './ol-overlay-windyiframe.component.html',
    styleUrls: ['./ol-overlay-windyiframe.component.css']
})
export class OlOverlayWindyiframeComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    @Output() onDataNeeded: EventEmitter<void>;


    constructor() {
        this.onDataNeeded = new EventEmitter<void>();
    }


    ngOnInit() {
        this.onDataNeeded.emit();
    }


    public updateWeather(position: Position2d, maxWidthPx: number) {
        while (this.container.nativeElement.firstChild) {
            this.container.nativeElement.removeChild(this.container.nativeElement.firstChild);
        }

        // <iframe width="800" height="220" src="https://embed.windytv.com/embed2.html?lat=46.9458&lon=7.4713&type=forecast&metricWind=kt&metricTemp=%C2%B0C" frameborder="0"></iframe>
        const iframe = document.createElement('iframe');
        iframe.src = 'https://embed.windytv.com/embed2.html?lat=' + position.latitude + '&lon=' + position.longitude
            + '&type=forecast&metricWind=kt&metricTemp=%C2%B0C';
        iframe.width = (maxWidthPx - 2 * 16).toString();
        iframe.height = '190px';
        iframe.frameBorder = '0';

        this.container.nativeElement.appendChild(iframe);
    }
}
