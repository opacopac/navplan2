import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MeteoDwdState} from '../../../domain/model/meteo-dwd-state';
import {getMeteoDwdState} from '../../../state/ngrx/meteo-dwd.selectors';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {MatSliderChange} from '@angular/material/slider';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';


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


    public formatLabel(step: number): string {
        const startHour = 15 + 2;
        const totHour = startHour + step;

        if (totHour === startHour) {
            return 'Now';
        }

        const dayOffset = Math.floor(totHour / 24);
        const dayDate = new Date(Date.now() + (3600 * 24 * dayOffset * 1000));
        const dayHour = totHour - 24 * dayOffset;
        const weekday = DatetimeHelper.getWeekdayShortFromDate(dayDate);

        return weekday + ' ' + StringnumberHelper.zeroPad(dayHour, 2) + ':00';
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
