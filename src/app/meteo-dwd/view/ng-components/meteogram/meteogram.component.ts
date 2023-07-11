import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {select, Store} from '@ngrx/store';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import {getCloudMeteogram} from '../../../state/ngrx/meteo-dwd.selectors';
import {Observable, Subscription} from 'rxjs';
import {CloudMeteogramSvg} from '../../svg/cloud-meteogram-svg';
import {CloudMeteogram} from '../../../domain/model/cloud-meteogram';


@Component({
    selector: 'app-meteogram',
    templateUrl: './meteogram.component.html',
    styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    private readonly cloudMeteogram$: Observable<CloudMeteogram> = this.appStore.pipe(select(getCloudMeteogram));
    private readonly meteogramStepsSubscription: Subscription;
    private currentMeteogram: CloudMeteogram;


    @Input() set position(pos: Position2d) {
        if (pos) {
            this.appStore.dispatch(MeteoDwdActions.readCloudMeteogram({position: pos}));
        }
    }


    constructor(private appStore: Store<any>) {
        this.meteogramStepsSubscription = this.cloudMeteogram$.subscribe(meteogram => this.onMeteogramChanged(meteogram));
    }


    ngOnInit(): void {
    }


    private onMeteogramChanged(meteogram: CloudMeteogram): void {
        this.currentMeteogram = meteogram;

        if (this.container) {
            this.redrawSvg();
        }
    }


    public redrawSvg() {
        if (this.currentMeteogram) {
            const svg = CloudMeteogramSvg.create(
                this.currentMeteogram,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
