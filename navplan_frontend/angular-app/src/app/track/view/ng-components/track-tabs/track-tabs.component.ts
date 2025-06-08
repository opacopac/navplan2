import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {Store} from '@ngrx/store';
import {TrackActions} from '../../../state/ngrx/track.actions';
import {
    TrackListPageComponent
} from '../../../../track-list/view/ng-components/track-list-page/track-list-page.component';
import {
    TrackProfilePageComponent
} from '../../../../track-profile/view/ng-components/track-profile-page/track-profile-page.component';


@Component({
    selector: 'app-track-tabs',
    imports: [
        MatTabsModule,
        TrackListPageComponent,
        TrackProfilePageComponent
    ],
    templateUrl: './track-tabs.component.html',
    styleUrls: ['./track-tabs.component.scss']
})
export class TrackTabsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    public readonly tab$: Observable<string>;
    public tabSubscription: Subscription;

    private tabMap: { [key: number]: string } = {
        0: 'list',
        1: 'profile',
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
            this.appStore.dispatch(TrackActions.selectTrackTab({selectedTab: tabLabel}));
            this.router.navigate(['/track', tabLabel]);
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
