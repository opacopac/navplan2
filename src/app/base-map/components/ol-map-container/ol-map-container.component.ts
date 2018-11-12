import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {Observable, Subscription} from 'rxjs';
import {BaseMapService} from '../../services/base-map.service';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {DataItem} from '../../../shared/model/data-item';
import {Extent} from '../../../shared/model/extent';
import {BaseMapClickedAction, BaseMapMovedZoomedRotatedAction} from '../../base-map.actions';
import {Angle} from '../../../shared/model/quantities/angle';
import {getMapPosition, getMapRotation, getMapZoom} from '../../base-map.selectors';
import {MapbaselayerType} from '../../model/mapbaselayer-factory';
import {BaseMapContext} from '../../model/base-map-context';


@Component({
    selector: 'app-ol-map-container',
    templateUrl: './ol-map-container.component.html',
    styleUrls: ['./ol-map-container.component.css']
})
export class OlMapContainerComponent implements OnInit, OnDestroy {
    @Output() public onMapInitCompleted: EventEmitter<BaseMapContext> = new EventEmitter<BaseMapContext>();
    private mapMovedZoomedRotatedSubscription: Subscription;
    private mapClickedSubscription: Subscription;
    private mapPosition$: Observable<Position2d>;
    private mapZoom$: Observable<number>;
    private mapRotation$: Observable<Angle>;

    public constructor(
        private appStore: Store<any>,
        private mapService: BaseMapService) {

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

            const mapContext = new BaseMapContext(this.appStore, this.mapService.map, this.mapService);
            this.onMapInitCompleted.emit(mapContext);
        });
    }

    // endregion


    // region events

    private dispatchPosZoomRotAction(position: Position2d, zoom: number, rotation: Angle, extent: Extent) {
        this.appStore.dispatch(
            new BaseMapMovedZoomedRotatedAction(
                position as Position2d,
                zoom as number,
                rotation as Angle,
                extent as Extent)
        );
    }


    private dispatchMapClickedAction(clickPos: Position2d, dataItem: DataItem) {
        this.appStore.dispatch(
            new BaseMapClickedAction(
                clickPos,
                dataItem
            )
        );
    }

    // endregion
}
