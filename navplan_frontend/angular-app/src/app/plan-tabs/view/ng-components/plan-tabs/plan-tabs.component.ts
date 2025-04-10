import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {Store} from '@ngrx/store';
import {PlanTabsActions} from '../../../state/ngrx/plan-tabs.actions';
import {RouteListPageComponent} from '../../../../plan-route-list/view/ng-components/route-list-page/route-list-page.component';
import {PlanWaypointsViewModule} from '../../../../plan-waypoints/view/plan-waypoints-view.module';
import {FuelCalcContainerComponent} from '../../../../plan-fuel/view/ng-components/fuel-calc-container/fuel-calc-container.component';
import {PlanWnbViewModule} from '../../../../plan-wnb/view/plan-wnb-view.module';
import {
    PlanPerfContainerComponent
} from '../../../../plan-performance/view/ng-components/plan-perf-container/plan-perf-container.component';
import {PlanMeteoContainerComponent} from '../../../../plan-meteo/view/ng-components/plan-meteo-container/plan-meteo-container.component';
import {WaypointsContainerComponent} from '../../../../plan-waypoints/view/ng-components/waypoints-container/waypoints-container.component';


@Component({
    selector: 'app-plan-tabs',
    standalone: true,
    imports: [
        MatTabsModule,
        RouteListPageComponent,
        PlanWaypointsViewModule,
        FuelCalcContainerComponent,
        PlanWnbViewModule,
        PlanPerfContainerComponent,
        PlanMeteoContainerComponent,
        WaypointsContainerComponent
    ],
    templateUrl: './plan-tabs.component.html',
    styleUrls: ['./plan-tabs.component.scss'],
})
export class PlanTabsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    public readonly tab$: Observable<string>;
    public tabSubscription: Subscription;

    private tabMap: { [key: number]: string } = {
        0: 'routelist',
        1: 'route',
        2: 'fuel',
        3: 'wnb',
        4: 'perf',
        5: 'meteo',
        6: 'notam'
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
            this.appStore.dispatch(PlanTabsActions.selectPlanTab({selectedPlanTab: tabLabel}));
            this.router.navigate(['/plan', tabLabel]);
        }
    }


    private getTabIndex(tab: string): number {
        const tabIndex = Object.values(this.tabMap).indexOf(tab);
        return tabIndex >= 0 ? tabIndex : 0;
    }


    private getTabKey(tabIndex: number): string {
        const tabKey = this.tabMap[tabIndex];
        return tabKey ? tabKey : this.tabMap[0];
    }
}
