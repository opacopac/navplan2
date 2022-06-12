import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MeteoDwdState} from '../../../domain/model/meteo-dwd-state';
import {getMeteoDwdState} from '../../../state/ngrx/meteo-dwd.selectors';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';


@Component({
    selector: 'app-meteo-dwd-timeline',
    templateUrl: './meteo-dwd-timeline.component.html',
    styleUrls: ['./meteo-dwd-timeline.component.css']
})
export class MeteoDwdTimelineComponent implements OnInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    private readonly meteoDwdState$: Observable<MeteoDwdState> = this.appStore.pipe(select(getMeteoDwdState));
    private readonly meteoDwdSubscription: Subscription;


    constructor(private appStore: Store<any>) {
        this.meteoDwdSubscription = this.meteoDwdState$.subscribe(state => this.updateTimeline(state.selectedInterval));
    }


    ngOnInit(): void {
    }


    ngOnDestroy(): void {
        this.meteoDwdSubscription.unsubscribe();
    }


    public onIntervalSelected(interval: number) {
        this.appStore.dispatch(
            MeteoDwdActions.selectInterval({ interval: interval })
        );
    }


    private updateTimeline(interval: number) {
        if (this.container) {
            // TODO
        }
    }
}
