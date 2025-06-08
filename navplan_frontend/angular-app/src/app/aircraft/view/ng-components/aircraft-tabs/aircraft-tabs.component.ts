import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {Store} from '@ngrx/store';
import {AircraftActions} from '../../../state/ngrx/aircraft.actions';
import {map} from 'rxjs/operators';
import {AircraftHangarPageComponent} from '../aircraft-hangar/aircraft-hangar-page/aircraft-hangar-page.component';
import {AircraftDetailsPageComponent} from '../aircraft-details/aircraft-details-page/aircraft-details-page.component';
import {
    AircraftWnbPageComponent
} from '../../../../aircraft-wnb/view/ng-components/aircraft-wnb-page/aircraft-wnb-page.component';
import {
    AircraftPerformancePageComponent
} from '../../../../aircraft-performance/view/ng-components/aircraft-performance-page/aircraft-performance-page.component';


@Component({
    selector: 'app-aircraft-tabs',
    imports: [
        MatTabsModule,
        AircraftHangarPageComponent,
        AircraftDetailsPageComponent,
        AircraftWnbPageComponent,
        AircraftPerformancePageComponent,
    ],
    templateUrl: './aircraft-tabs.component.html',
    styleUrls: ['./aircraft-tabs.component.scss']
})
export class AircraftTabsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    private readonly tab$: Observable<string>;
    private tabSubscription: Subscription;

    private tabMap: { [key: number]: string } = {
        0: 'hangar',
        1: 'aircraft',
        2: 'wnb',
        3: 'perf'
    };


    constructor(
        route: ActivatedRoute,
        private router: Router,
        private appStore: Store<any>
    ) {
        this.tab$ = route.params.pipe(
            map(params => params['tab'])
        );
    }


    ngOnInit() {
    }


    ngAfterViewInit() {
        this.tabSubscription = this.tab$.subscribe(tab => {
            if (this.tabGroup) {
                this.tabGroup.selectedIndex = this.getTabIndex(tab);
            }
        });
    }


    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
    }


    protected onTabChange($event: MatTabChangeEvent) {
        const tabLabel = this.tabMap[$event.index];
        if (tabLabel) {
            this.appStore.dispatch(AircraftActions.selectAircraftTab({selectedTab: tabLabel}));
            this.router.navigate(['/aircraft', tabLabel]);
        }
    }


    private getTabIndex(tab: string): number {
        const tabIndex = Object.values(this.tabMap).indexOf(tab);
        return tabIndex >= 0 ? tabIndex : 0;
    }
}
