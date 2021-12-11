import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {VerticalMapState} from '../../../vertical-map-state-flight-map/ngrx/vertical-map-state';
import {getVerticalMapState} from '../../../vertical-map-state-flight-map/ngrx/vertical-map.selectors';
import {VerticalMap} from '../../../vertical-map/domain-model/vertical-map';
import {VerticalMapSvg} from '../../svg/vertical-map-svg';


@Component({
    selector: 'app-vertical-map',
    templateUrl: './vertical-map.component.html',
    styleUrls: ['./vertical-map.component.css']
})
export class VerticalMapComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('container') container: ElementRef;
    private readonly vmState$: Observable<VerticalMapState> = this.appStore.pipe(select(getVerticalMapState));
    private readonly vmSubscription: Subscription;
    private currentVerticalMap: VerticalMap;


    constructor(private appStore: Store<any>) {
        this.vmSubscription = this.vmState$.subscribe(vm => this.updateVm(vm.verticalMap));
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    ngOnDestroy(): void {
        this.vmSubscription.unsubscribe();
    }


    private updateVm(verticalMap: VerticalMap) {
        this.currentVerticalMap = verticalMap;

        if (this.container) {
            this.redrawSvg();
        }
    }


    public redrawSvg() {
        if (this.currentVerticalMap) {
            const svg = VerticalMapSvg.create(
                this.currentVerticalMap,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight,
                null
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
