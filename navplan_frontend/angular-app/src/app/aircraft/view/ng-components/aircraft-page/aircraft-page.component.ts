import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';


@Component({
    selector: 'app-aircraft-page',
    templateUrl: './aircraft-page.component.html',
    styleUrls: ['./aircraft-page.component.scss'],
})
export class AircraftPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    public readonly tab$: Observable<string>;
    public tabSubscription: Subscription;

    private tabMap: { [key: number]: string } = {
        0: 'hangar',
        1: 'aircraft',
        2: 'wnb',
        3: 'perf'
    };


    constructor(
        private router: Router,
        private route: ActivatedRoute
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
            this.router.navigate(['/aircraft', tabLabel]);
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
