import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {Observable, Subscription} from 'rxjs';
import {OlMapService} from '../../use-case/ol-map.service';
import {Position2d} from '../../../geo-math/domain/geometry/position2d';
import {DataItem} from '../../../shared/model/data-item';
import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {OlMapClickedAction, OlMapMovedZoomedRotatedAction} from '../../ngrx/ol-map.actions';
import {Angle} from '../../../geo-math/domain/quantities/angle';
import {getMapPosition, getMapRotation, getMapZoom} from '../../ngrx/ol-map.selectors';
import {MapbaselayerType} from '../../domain/ol-baselayer-factory';
import {OlMapContext} from '../../domain/ol-map-context';


@Component({
    selector: 'app-ol-map-container',
    templateUrl: './ol-map-container.component.html',
    styleUrls: ['./ol-map-container.component.css']
})
export class OlMapContainerComponent implements OnInit, OnDestroy {
    @Output() public onMapInitCompleted: EventEmitter<OlMapContext> = new EventEmitter<OlMapContext>();
    private mapMovedZoomedRotatedSubscription: Subscription;
    private mapClickedSubscription: Subscription;
    private mapPosition$: Observable<Position2d>;
    private mapZoom$: Observable<number>;
    private mapRotation$: Observable<Angle>;

    public constructor(
        private appStore: Store<any>,
        private mapService: OlMapService) {

        this.mapPosition$ = this.appStore.pipe(select(getMapPosition));
        this.mapZoom$ = this.appStore.pipe(select(getMapZoom));
        this.mapRotation$ = this.appStore.pipe(select(getMapRotation));
    }


    // region component life cycle

    public ngOnInit() {
        this.initMapAndFeaturesAsync();

        this.mapMovedZoomedRotatedSubscription = this.mapService.onMapMovedZoomedRotated.subscribe(event => {
            this.dispatchPosZoomRotAction(event.position, event.zoom, event.rotation, event.extent);
        });

        this.mapClickedSubscription = this.mapService.onMapClicked.subscribe(event => {
            this.dispatchMapClickedAction(event.clickPos, event.dataItem);
        });
    }


    public ngOnDestroy() {
        this.mapMovedZoomedRotatedSubscription.unsubscribe();
        this.mapClickedSubscription.unsubscribe();

        this.mapService.uninitMap();
    }


    private initMapAndFeaturesAsync() {
        combineLatest(
            this.mapPosition$,
            this.mapZoom$,
            this.mapRotation$
        ).pipe(
            take(1)
        ).subscribe(([pos, zoom, rot]) => {
            this.mapService.initMap(
                MapbaselayerType.OPENTOPOMAP, // TODO
                pos,
                zoom,
                rot);

            const mapContext = new OlMapContext(this.appStore, this.mapService.map, this.mapService);
            this.onMapInitCompleted.emit(mapContext);
        });
    }

    // endregion


    // region events

    private dispatchPosZoomRotAction(position: Position2d, zoom: number, rotation: Angle, extent: Extent2d) {
        this.appStore.dispatch(
            new OlMapMovedZoomedRotatedAction(
                position as Position2d,
                zoom as number,
                rotation as Angle,
                extent as Extent2d)
        );
    }


    private dispatchMapClickedAction(clickPos: Position2d, dataItem: DataItem) {
        this.appStore.dispatch(
            new OlMapClickedAction(
                clickPos,
                dataItem
            )
        );
    }

    // endregion
}
