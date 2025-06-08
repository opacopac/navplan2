import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {DataItem} from '../../../../common/domain/model/data-item';
import {BaseMapActions} from '../../../state/ngrx/base-map.actions';
import {Angle} from '../../../../geo-physics/domain/model/quantities/angle';
import Overlay from 'ol/Overlay';
import {MapBaseLayerType} from '../../../domain/model/map-base-layer-type';
import {
    getMapPosition,
    getMapZoom,
    getSelectedMapBaseLayerType,
    getShowImage
} from '../../../state/ngrx/base-map.selectors';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/internal/Subscription';
import {ShowImageState} from '../../../state/state-model/show-image-state';
import {OlMap} from '../../ol-model/ol-map';
import {OlLayer} from '../../ol-model/ol-layer';
import {IBaseMap} from '../../../domain/model/i-base-map';


@Component({
    selector: 'app-ol-map-container',
    imports: [],
    templateUrl: './ol-map-container.component.html',
    styleUrls: ['./ol-map-container.component.scss']
})
export class OlMapContainerComponent implements OnInit, OnDestroy {
    public readonly MAP_HTML_ID = 'map';

    @ViewChild('container') container: ElementRef;

    private baseMap: IBaseMap;
    private readonly zoom$: Observable<number> = this.appStore.pipe(select(getMapZoom));
    private readonly position$: Observable<Position2d> = this.appStore.pipe(select(getMapPosition));
    private readonly showImage$: Observable<ShowImageState> = this.appStore.pipe(select(getShowImage));
    private readonly zoomSubscription: Subscription;
    private readonly positionSubscription: Subscription;
    private readonly showImageSubscription: Subscription;
    private readonly selectedBaseLayerType$: Observable<MapBaseLayerType> = this.appStore.pipe(select(getSelectedMapBaseLayerType));
    private readonly selectedBaseLayerTypeSubscription: Subscription;
    private mapMovedSubscription: Subscription;
    private mapClickedSubscription: Subscription;


    public constructor(private appStore: Store<any>) {
        this.zoomSubscription = this.zoom$.subscribe(zoom => this.setZoom(zoom));
        this.positionSubscription = this.position$.subscribe(position => this.setPosition(position));
        this.showImageSubscription = this.showImage$.subscribe(imageState => this.showImage(imageState));
        this.selectedBaseLayerTypeSubscription = this.selectedBaseLayerType$.subscribe(layerType => this.changeBaseLayer(layerType));
    }


    public createMap(
        featureLayers: OlLayer[],
        mapOverlays: Overlay[],
        position: Position2d,
        zoom: number,
        mapRotation: Angle
    ): IBaseMap {
        this.baseMap = new OlMap(this.MAP_HTML_ID, featureLayers, mapOverlays, position, zoom, mapRotation);
        this.mapMovedSubscription = this.baseMap.mapMove$.subscribe(() => this.onMapMoved());
        this.mapClickedSubscription = this.baseMap.mapClick$.subscribe(([clickPos, dataItem]) => this.onSingleClick(clickPos, dataItem));

        return this.baseMap;
    }


    public ngOnInit() {
    }


    public ngOnDestroy() {
        this.zoomSubscription.unsubscribe();

        if (this.baseMap) {
            this.mapMovedSubscription.unsubscribe();
            this.baseMap.uninit();
            this.baseMap = undefined;
        }
    }


    private onMapMoved() {
        this.appStore.dispatch(
            BaseMapActions.mapMoved({
                position: this.baseMap.getMapPosition(),
                zoom: this.baseMap.getZoom(),
                rotation: this.baseMap.getRotation(),
                extent: this.baseMap.getExtent(),
                widthPx: this.container.nativeElement.clientWidth,
                heightPx: this.container.nativeElement.clientHeight
            })
        );
    }


    private onSingleClick(clickPos: Position2d, dataItem: DataItem) {
        this.appStore.dispatch(
            BaseMapActions.mapClicked({
                clickPos: clickPos,
                dataItem: dataItem,
                zoom: this.baseMap.getZoom()
            })
        );
    }


    private setZoom(zoom: number): void {
        if (this.baseMap && this.baseMap.getZoom() !== zoom) {
            this.baseMap.setZoom(zoom);
        }
    }


    private setPosition(position: Position2d): void {
        if (this.baseMap && this.baseMap.getMapPosition() !== position) {
            this.baseMap.setPosition(position);
        }
    }


    private showImage(showImageState: ShowImageState): void {
        if (this.baseMap) {
            this.baseMap.showImage(showImageState);
        }
    }


    private changeBaseLayer(mapBaseLayerType: MapBaseLayerType): void {
        if (this.baseMap) {
            this.baseMap.changeBaseLayer(mapBaseLayerType);
        }
    }
}
