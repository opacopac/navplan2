import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Position2d} from '../../../geo-physics/domain-model/geometry/position2d';
import {DataItem} from '../../../common/model/data-item';
import {BaseMapActions} from '../../../base-map-state/ngrx/base-map.actions';
import {Angle} from '../../../geo-physics/domain-model/quantities/angle';
import Overlay from 'ol/Overlay';
import {MapBaseLayerType} from '../../../base-map/domain-model/map-base-layer-type';
import {getMapZoom, getSelectedMapBaseLayerType, getShowImage} from '../../../base-map-state/ngrx/base-map.selectors';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/internal/Subscription';
import {ShowImageState} from '../../../base-map-state/state-model/show-image-state';
import {OlMap} from '../../ol-model/ol-map';
import {OlLayer} from '../../ol-model/ol-layer';


@Component({
    selector: 'app-ol-map-container',
    templateUrl: './ol-map-container.component.html',
    styleUrls: ['./ol-map-container.component.css']
})
export class OlMapContainerComponent implements OnInit, OnDestroy {
    public readonly MAP_HTML_ID = 'map';

    private olMap: OlMap;
    private readonly zoom$: Observable<number> = this.appStore.pipe(select(getMapZoom));
    private readonly showImage$: Observable<ShowImageState> = this.appStore.pipe(select(getShowImage));
    private readonly zoomSubscription: Subscription;
    private readonly showImageSubscription: Subscription;
    private readonly selectedBaseLayerType$: Observable<MapBaseLayerType> = this.appStore.pipe(select(getSelectedMapBaseLayerType));
    private readonly selectedBaseLayerTypeSubscription: Subscription;
    private mapMovedSubscription: Subscription;
    private mapClickedSubscription: Subscription;


    public constructor(private appStore: Store<any>) {
        this.zoomSubscription = this.zoom$.subscribe(zoom => this.setZoom(zoom));
        this.showImageSubscription = this.showImage$.subscribe(imageState => this.showImage(imageState));
        this.selectedBaseLayerTypeSubscription = this.selectedBaseLayerType$.subscribe(layerType => this.changeBaseLayer(layerType));
    }


    public createMap(
        featureLayers: OlLayer[],
        mapOverlays: Overlay[],
        position: Position2d,
        zoom: number,
        mapRotation: Angle
    ): OlMap {
        this.olMap = new OlMap(this.MAP_HTML_ID, featureLayers, mapOverlays, position, zoom, mapRotation);
        this.mapMovedSubscription = this.olMap.mapMove$.subscribe(() => this.onMapMoved());
        this.mapClickedSubscription = this.olMap.mapClick.subscribe(([clickPos, dataItem]) => this.onSingleClick(clickPos, dataItem));

        return this.olMap;
    }


    public ngOnInit() {
    }


    public ngOnDestroy() {
        this.zoomSubscription.unsubscribe();

        if (this.olMap) {
            this.mapMovedSubscription.unsubscribe();
            this.olMap.uninit();
            this.olMap = undefined;
        }
    }


    private onMapMoved() {
        this.appStore.dispatch(
            BaseMapActions.mapMoved({
                position: this.olMap.getMapPosition(),
                zoom: this.olMap.getZoom(),
                rotation: this.olMap.getRotation(),
                extent: this.olMap.getExtent()
            })
        );
    }


    private onSingleClick(clickPos: Position2d, dataItem: DataItem) {
        this.appStore.dispatch(
            BaseMapActions.mapClicked({
                clickPos: clickPos,
                dataItem: dataItem,
                zoom: this.olMap.getZoom()
            })
        );
    }


    private setZoom(zoom: number): void {
        if (this.olMap && this.olMap.getZoom() !== zoom) {
            this.olMap.setZoom(zoom);
        }
    }


    private showImage(showImageState: ShowImageState): void {
        if (this.olMap) {
            this.olMap.showImage(showImageState);
        }
    }


    private changeBaseLayer(mapBaseLayerType: MapBaseLayerType): void {
        if (this.olMap) {
            this.olMap.changeBaseLayer(mapBaseLayerType);
        }
    }
}
