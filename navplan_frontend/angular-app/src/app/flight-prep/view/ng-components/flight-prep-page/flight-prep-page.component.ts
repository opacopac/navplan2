import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {MatLegacyTabGroup as MatTabGroup} from '@angular/material/legacy-tabs';


@Component({
    selector: 'app-flight-prep-page',
    templateUrl: './flight-prep-page.component.html',
    styleUrls: ['./flight-prep-page.component.css'],
})
export class FlightPrepPageComponent implements OnInit, AfterViewInit, OnDestroy {
    public readonly tab$: Observable<string>;
    public tabSubscription: Subscription;
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;


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
                this.tabGroup.selectedIndex = this.getIndex(tab);
            }
        });
    }


    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
    }


    private getIndex(tab: string): number {
        switch (tab) {
            case 'fuel': return 1;
            case 'wnb': return 2;
            case 'perf': return 3;
            case 'meteo': return 4;
            case 'notam': return 5;
            case 'route':
            default:
                return 0;
        }
    }
}
