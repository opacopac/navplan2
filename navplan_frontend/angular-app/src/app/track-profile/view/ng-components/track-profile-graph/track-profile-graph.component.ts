import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {TrackProfile} from '../../../../track/domain/model/track-profile';
import {TrackProfileGraphSvg} from '../../svg/track-profile-graph-svg';


@Component({
    selector: 'app-track-profile-graph',
    imports: [],
    templateUrl: './track-profile-graph.component.html',
    styleUrls: ['./track-profile-graph.component.scss']
})
export class TrackProfileGraphComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() trackProfile: TrackProfile;
    @ViewChild('container') container: ElementRef;


    constructor() {
    }


    ngOnInit(): void {
    }


    ngOnChanges(): void {
        this.redrawSvg();
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    public redrawSvg() {
        if (!this.container) {
            return;
        }

        this.container.nativeElement.innerHTML = '';

        if (this.trackProfile) {
            const svg = TrackProfileGraphSvg.create(
                this.trackProfile,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight,
                (date) => this.onZoomInClicked(date),
                (date) => this.onZoomOutClicked(date)
            );

            this.container.nativeElement.appendChild(svg);
        }
    }


    private onZoomInClicked(date: Date) {
        console.log('zoom in clicked: ' + date);
        // TODO
    }


    private onZoomOutClicked(date: Date) {
        console.log('zoom out clicked: ' + date);
        // TODO
    }
}
