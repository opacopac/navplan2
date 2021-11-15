import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class VerticalMapComponent implements OnInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    private readonly vmState$: Observable<VerticalMapState> = this.appStore.pipe(select(getVerticalMapState));
    private verticalMapSubscription: Subscription;


    constructor(private appStore: Store<any>) {
        this.verticalMapSubscription = this.vmState$.subscribe(vm => this.redrawSvg(vm.verticalMap));
    }


    ngOnInit(): void {
    }


    ngOnDestroy() {
        this.verticalMapSubscription.unsubscribe();
    }


    private redrawSvg(verticalMap: VerticalMap) {
        if (!this.container) {
            return;
        }

        if (verticalMap !== undefined) {
            const svg = VerticalMapSvg.create(verticalMap, 1000, 200, null);
            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
