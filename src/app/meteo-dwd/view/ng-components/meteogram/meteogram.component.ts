import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {Store, select} from '@ngrx/store';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import { CloudMeteogramStep } from '../../../domain/model/cloud-meteogram-step';
import { getMeteogramSteps } from '../../../state/ngrx/meteo-dwd.selectors';
import { Observable, Subscription } from 'rxjs';
import { CloudMeteogramSvg } from '../../svg/cloud-meteogram-svg';


@Component({
    selector: 'app-meteogram',
    templateUrl: './meteogram.component.html',
    styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    private readonly meteogramSteps$: Observable<CloudMeteogramStep[]> = this.appStore.pipe(select(getMeteogramSteps));
    private readonly meteogramStepsSubscription: Subscription;
    private currentMeteogramSteps: CloudMeteogramStep[];


    @Input() set position(pos: Position2d) {
        if (pos) {
            this.appStore.dispatch(MeteoDwdActions.readCloudMeteogram({position: pos}));
        }
    }


    constructor(private appStore: Store<any>) {
        this.meteogramStepsSubscription = this.meteogramSteps$.subscribe(steps => this.onMeteogramStepsChanged(steps));
    }


    ngOnInit(): void {
    }


    private onMeteogramStepsChanged(steps: CloudMeteogramStep[]): void {
        this.currentMeteogramSteps = steps;

        if (this.container) {
            this.redrawSvg();
        }
    }


    public redrawSvg() {
        if (this.currentMeteogramSteps) {
            const svg = CloudMeteogramSvg.create(
                this.currentMeteogramSteps,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
