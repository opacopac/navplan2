import { Injectable } from '@angular/core';
import { DatetimeService } from './datetime.service';


@Injectable()
export class TimerService {
    public currentTime: Date;
    public stopTime: Date;
    private timerId: number;


    constructor() {
    }


    public startClockTimer() {
        this.currentTime = new Date();
        this.currentTime.setMilliseconds(0);
        this.stopTime = undefined;
        this.timerId = window.setInterval(this.onClockTimer.bind(this), 1000);
    }


    public stopClockTimer() {
        window.clearInterval(this.timerId);
        this.timerId = undefined;
    }


    public onTimerClicked() {
        this.stopTime = new Date(this.currentTime);
    }


    private onClockTimer() {
        if (!this.timerId) {
            return;
        }

        const d = new Date();
        d.setMilliseconds(0);
        this.currentTime =  d;
    }


    public getCurrentTimeString(): string {
        if (this.currentTime) {
            return DatetimeService.getHourMinSecStringFromDate(this.currentTime);
        } else {
            return '';
        }
    }


    public getStopTimeString(): string {
        if (this.stopTime) {
            return DatetimeService.getHourMinSecStringFromDate(this.stopTime);
        } else {
            return '';
        }
    }


    public getElapsedTimeString(): string {
        if (this.stopTime) {
            const diffMs = this.currentTime.getTime() - this.stopTime.getTime();
            return '+' + DatetimeService.getMinSecStringFromDate(new Date(diffMs));
        } else {
            return '';
        }
    }
}
