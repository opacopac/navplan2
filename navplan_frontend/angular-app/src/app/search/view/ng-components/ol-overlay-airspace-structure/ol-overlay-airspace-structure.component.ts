import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Airspace} from '../../../../enroute/domain/model/airspace';
import {OlOverlayBaseComponent} from '../../../../base-map/view/ng-components/ol-overlay-base.component';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {getPositionSearchState} from '../../../state/ngrx/search.selectors';
import {PositionSearchState} from '../../../domain/model/position-search-state';


@Component({
    selector: 'app-ol-overlay-airspace-structure',
    templateUrl: './ol-overlay-airspace-structure.component.html',
    styleUrls: ['./ol-overlay-airspace-structure.component.scss']
})
export class OlOverlayAirspaceStructureComponent extends OlOverlayBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    public airspaceList: Airspace[];
    public groupedAirspaceList: Airspace[];
    public showGrouped = true;
    public showToggle: boolean;
    private searchStateSubscription: Subscription;
    private readonly positionSearchState$: Observable<PositionSearchState> = this.appStore.select(getPositionSearchState);


    public constructor(
        cdRef: ChangeDetectorRef,
        private appStore: Store<any>
    ) {
        super(cdRef);
    }


    ngOnInit() {
    }


    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.searchStateSubscription = this.positionSearchState$.subscribe(searchState => this.bindData(searchState));
    }


    ngOnDestroy() {
        this.searchStateSubscription.unsubscribe();
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    private bindData(posSearchState: PositionSearchState) {
        this.airspaceList = posSearchState && posSearchState.positionSearchResults
            ? posSearchState.positionSearchResults.getAirspaceResults()
            : [];
        this.groupedAirspaceList = posSearchState && posSearchState.positionSearchResults
            ? posSearchState.positionSearchResults.getGroupedAirspaceResults()
            : [];
        const position = this.airspaceList.length > 0
            ? posSearchState.clickPos
            : undefined;
        this.showToggle = this.airspaceList.length !== this.groupedAirspaceList.length;
        this.showGrouped = true;

        this.setPosition(position);
        this.markForCheck();
    }


    public getAirspaceList(): Airspace[] {
        if (this.showGrouped) {
            return this.groupedAirspaceList;
        } else {
            return this.airspaceList;
        }
    }


    public getToggleText(): string {
        return this.showGrouped ? 'details' : 'group';
    }


    public getToggleIcon(): string {
        return this.showGrouped ? 'fas fa-caret-down' : 'fas fa-caret-up';
    }


    public onToggle(): void {
        this.showGrouped = !this.showGrouped;
    }
}
