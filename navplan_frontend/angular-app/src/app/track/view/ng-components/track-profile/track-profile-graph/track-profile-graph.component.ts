import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {getSelectedTrackProfile} from '../../../../state/ngrx/track.selectors';
import {TrackProfile} from '../../../../domain/model/track-profile';
import {TrackProfileGraphSvg} from '../../../svg/track-profile-graph-svg';


@Component({
    selector: 'app-track-profile-graph',
    templateUrl: './track-profile-graph.component.html',
    styleUrls: ['./track-profile-graph.component.scss']
})
export class TrackProfileGraphComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    private readonly trackProfile$ = this.appStore.pipe(select(getSelectedTrackProfile));
    private readonly trackProfileSubscription: Subscription;
    private currentTrackProfile: TrackProfile;


    constructor(private appStore: Store<any>) {
        this.trackProfileSubscription = this.trackProfile$.subscribe(trackProfile => this.onTrackProfileChanged(trackProfile));
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    ngOnDestroy() {
        this.trackProfileSubscription.unsubscribe();
    }


    private onTrackProfileChanged(trackProfile: TrackProfile): void {
        this.currentTrackProfile = trackProfile;

        if (this.container) {
            this.redrawSvg();
        }
    }


    public redrawSvg() {
        if (!this.container) {
            return;
        }

        this.container.nativeElement.innerHTML = '';

        if (this.currentTrackProfile) {
            const svg = TrackProfileGraphSvg.create(
                this.currentTrackProfile,
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
