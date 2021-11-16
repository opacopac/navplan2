import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {VerticalMapState} from '../../domain-model/vertical-map-state';
import {getVerticalMapState} from '../../ngrx/vertical-map.selectors';
import {VerticalMap} from '../../domain-model/vertical-map';
import {VerticalMapSvg} from '../../svg/vertical-map-svg';


@Component({
    selector: 'app-vertical-map',
    templateUrl: './vertical-map.component.html',
    styleUrls: ['./vertical-map.component.css']
})
export class VerticalMapComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('container') container: ElementRef;
    private readonly vmState$: Observable<VerticalMapState> = this.appStore.pipe(select(getVerticalMapState));
    private verticalMapSubscription: Subscription;
    private currentVerticalMap: VerticalMap;


    constructor(private appStore: Store<any>) {
        this.verticalMapSubscription = this.vmState$.subscribe(vm => this.updateVm(vm.verticalMap));
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    ngOnDestroy(): void {
        this.verticalMapSubscription.unsubscribe();
    }


    private updateVm(verticalMap: VerticalMap) {
        this.currentVerticalMap = verticalMap;

        if (this.container) {
            this.redrawSvg();
        }
    }


    private redrawSvg() {
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
