import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MeteoDwdState} from '../../../domain/model/meteo-dwd-state';
import {getMeteoDwdState} from '../../../state/ngrx/meteo-dwd.selectors';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {MatSliderChange} from '@angular/material/slider';


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


    public formatLabel(value: number) {
        const startHour = 18 + 2;
        const hour = startHour + value;

        if (hour === startHour) {
            return 'Now';
        }

        if (hour < 24) {
            return 'Tue ' + StringnumberHelper.zeroPad(hour, 2) + ':00';
        }

        if (hour < 48) {
            return 'Wed ' + StringnumberHelper.zeroPad(hour - 24, 2) + ':00';
        }

        if (hour < 72) {
            return 'Thu ' + StringnumberHelper.zeroPad(hour - 48, 2) + ':00';
        }

        return StringnumberHelper.zeroPad(value, 3);
    }


    public onIntervalSelected(event: MatSliderChange) {
        this.appStore.dispatch(
            MeteoDwdActions.selectInterval({ interval: event.value })
        );
    }


    private updateTimeline(interval: number) {
        if (this.container) {
            // TODO
        }
    }
}
