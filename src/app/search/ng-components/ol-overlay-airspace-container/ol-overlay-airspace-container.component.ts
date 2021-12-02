import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Airspace} from '../../../enroute/domain-model/airspace';
import {OlOverlayBase2Component} from '../../../base-map/ng-components/ol-overlay-base.component2';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {getSearchState} from '../../ngrx/search.selectors';
import {SearchState} from '../../domain-model/search-state';
import {DataItemType} from '../../../common/model/data-item';


@Component({
    selector: 'app-ol-overlay-airspace-container',
    templateUrl: './ol-overlay-airspace-container.component.html',
    styleUrls: ['./ol-overlay-airspace-container.component.css']
})
export class OlOverlayAirspaceContainerComponent extends OlOverlayBase2Component<Airspace[]> implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    public airspaceList: Airspace[];
    public isSimplified: boolean;
    public showToggle: boolean;
    private searchStateSubscription: Subscription;
    private readonly searchState$: Observable<SearchState> = this.appStore.select(getSearchState);


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
        this.searchStateSubscription = this.searchState$.subscribe(searchState => {
            const airspaces = searchState.positionSearchState
                ? searchState.positionSearchState.searchItems
                    .filter(item => item.dataItem.dataItemType === DataItemType.airspace)
                    .map(item => (item.dataItem as Airspace))
                : [];
            this.bindData(airspaces, searchState.positionSearchState.clickPos);
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
