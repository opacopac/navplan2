import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Airspace} from '../../../enroute/domain-model/airspace';
import {OlOverlayBase2Component} from '../../../base-map/ng-components/ol-overlay-base.component2';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {getPositionSearchState} from '../../ngrx/search.selectors';
import {PositionSearchState} from '../../domain-model/position-search-state';


@Component({
    selector: 'app-ol-overlay-airspace-structure',
    templateUrl: './ol-overlay-airspace-structure.component.html',
    styleUrls: ['./ol-overlay-airspace-structure.component.css']
})
export class OlOverlayAirspaceStructureComponent extends OlOverlayBase2Component<Airspace[]> implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    public airspaceList: Airspace[];
    public isSimplified: boolean;
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
        this.searchStateSubscription = this.positionSearchState$.subscribe(searchState => {
            const airspaces = searchState && searchState.positionSearchResults
                ? searchState.positionSearchResults.getAirspaceResults()
                : [];
            this.bindData(airspaces, searchState.clickPos);
        });
    }


    ngOnDestroy() {
        this.searchStateSubscription.unsubscribe();
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    protected bindDataImpl(data: Airspace[], position: Position2d) {
        this.airspaceList = data;
        this.olOverlay.setPosition(data && data.length > 0 ? OlGeometry.getMercator(position) : undefined);
    }


    public getId(): string {
        return this.isSimplified ? 'airspace-popup-simplified' : 'airspace-popup';
    }


    public getDisplay(): string {
        return this.showToggle && !this.isSimplified ? 'none' : 'block';
    }


    public getToggleText(): string {
        return this.isSimplified ? 'details' : 'group';
    }


    public getToggleIcon(): string {
        return this.isSimplified ? 'glyphicon glyphicon-collapse-down' : 'glyphicon glyphicon-collapse-up';
    }


    public airspaceListToggle(): void {
        // TODO
    }
}
