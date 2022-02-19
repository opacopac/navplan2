import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Position2d} from '../../../geo-physics/domain-model/geometry/position2d';
import {DataItem} from '../../../common/model/data-item';
import {Extent2d} from '../../../geo-physics/domain-model/geometry/extent2d';
import {BaseMapActions} from '../../../base-map-state/ngrx/base-map.actions';
import {Angle} from '../../../geo-physics/domain-model/quantities/angle';
import {Feature, Map, MapBrowserEvent, MapEvent, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay';
import {MapBaseLayerType} from '../../../base-map/domain-model/map-base-layer-type';
import {OlBaselayerFactory} from '../../ol-service/ol-baselayer-factory';
import {Attribution, FullScreen, Rotate, ScaleLine} from 'ol/control';
import {Pixel} from 'ol/pixel';
import {ObjectEvent} from 'ol/Object';
import {getMapZoom, getShowImage} from '../../../base-map-state/ngrx/base-map.selectors';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/internal/Subscription';
import ImageLayer from 'ol/layer/Image';
import {ShowImageState} from '../../../base-map-state/state-model/show-image-state';
import Projection from 'ol/proj/Projection';
import {ImageStatic, Vector} from 'ol/source';
import {ArrayHelper} from '../../../system/domain-service/array/array-helper';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import {Geometry} from 'ol/geom';
import {OlVectorLayer} from '../../ol-model/ol-vector-layer';
import {OlGeometry} from '../../ol-model/ol-geometry';
import {OlFeature} from '../../ol-model/ol-feature';
import {MouseWheelZoom} from 'ol/interaction';
import {AngleUnit} from '../../../geo-physics/domain-model/quantities/angle-unit';
import {OlMap} from '../../ol-model/ol-map';
import {OlBaseLayer} from '../../ol-model/ol-base-layer';


@Component({
    selector: 'app-ol-map-container',
    templateUrl: './ol-map-container.component.html',
    styleUrls: ['./ol-map-container.component.css']
})
export class OlMapContainerComponent implements OnInit, OnDestroy {
    private readonly IMAGE_LAYER_FIRST_INDEX = 1;
    private readonly IMAGE_ID_KEY = 'imageId';
    private readonly HIT_TOLERANCE_PIXELS = 10;
    private map: Map;
    private baseLayer: OlBaseLayer;
    private featureLayers: OlVectorLayer[] = [];
    private readonly imageLayers: ImageLayer<ImageStatic>[] = [];
    private readonly $zoom: Observable<number>;
    private readonly $showImage: Observable<ShowImageState>;
    private readonly zoomSubscription: Subscription;
    private readonly showImageSubscription: Subscription;


    public constructor(private appStore: Store<any>) {
        this.$zoom = this.appStore.pipe(select(getMapZoom));
        this.$showImage = this.appStore.pipe(select(getShowImage));
        this.zoomSubscription = this.$zoom.subscribe(zoom => this.setZoom(zoom));
        this.showImageSubscription = this.$showImage.subscribe(imageState => this.showImage(imageState));
    }


    // region init / uninit

    public init(
        baseLayerType: MapBaseLayerType,
        featureLayers: OlVectorLayer[],
        mapOverlays: Overlay[],
        position: Position2d,
        zoom: number,
        mapRotation: Angle
    ): OlMap {
        this.baseLayer = OlBaselayerFactory.create(baseLayerType);
        this.featureLayers = featureLayers;
        const allLayers = [];
        allLayers.push(this.baseLayer.layer); // TODO
        allLayers.push(...this.featureLayers.map(layer => layer.vectorLayer));
        this.map = new Map({
            target: 'map',
            controls: [
                new Attribution(),
                new FullScreen(),
                new ScaleLine(),
                new Rotate()
            ],
            layers: allLayers,
            overlays: mapOverlays,
            view: new View({
                center: OlGeometry.getMercator(position),
                zoom: zoom,
                rotation: mapRotation.rad,
            }),
        });
        this.map.addInteraction(
            new MouseWheelZoom({ constrainResolution: true })
        );


        // map events
        this.map.on('singleclick', this.onSingleClick.bind(this));
        this.map.on('pointermove', this.onPointerMove.bind(this));
        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.getView().on('change:rotation', this.onMapRotation.bind(this));

        return new OlMap(this.map);
    }


    public uninitMap() {
        this.map.un('singleclick', this.onSingleClick.bind(this));
        this.map.un('pointermove', this.onPointerMove.bind(this));
        this.map.un('moveend', this.onMoveEnd.bind(this));
        this.map.getView().un('change:rotation', this.onMapRotation.bind(this));
        this.map.setTarget(undefined);
        this.map = undefined;
    }

    // endregion


    // region component life cycle

    public ngOnInit() {
    }


    public ngOnDestroy() {
        this.uninitMap();
        this.zoomSubscription.unsubscribe();
    }

    // endregion


    // region map events

    private onMoveEnd(event: MapEvent) {
        this.appStore.dispatch(
            BaseMapActions.mapMoved({
                position: this.getMapPosition(),
                zoom: this.getZoom(),
                rotation: this.getRotation(),
                extent: this.getExtent()
            })
        );
    }


    private onMapRotation(event: ObjectEvent) {
        this.appStore.dispatch(
            BaseMapActions.mapMoved({
                position: this.getMapPosition(),
                zoom: this.getZoom(),
                rotation: this.getRotation(),
                extent: this.getExtent()
            })
        );
    }


    private onSingleClick(event: MapBrowserEvent<UIEvent>) {
        const dataItem = this.getDataItemAtPixel(event.pixel, true);
        const eventPos = event.coordinate;
        const clickPos = OlGeometry.getPosFromMercator([eventPos[0], eventPos[1]]);

        this.appStore.dispatch(
            BaseMapActions.mapClicked({
                clickPos: clickPos,
                dataItem: dataItem,
                zoom: this.getZoom()
            })
        );
    }


    private onPointerMove(event: MapBrowserEvent<UIEvent>) {
        if (event.dragging) {
            return;
        }

        const dataItem = this.getDataItemAtPixel(event.pixel, true);

        if (dataItem) {
            const element = this.map.getTargetElement() as HTMLElement;
            element.style.cursor = 'pointer';
        } else {
            const element = this.map.getTargetElement() as HTMLElement;
            element.style.cursor = 'default';
        }
    }


    private getDataItemAtPixel(pixel: Pixel, onlyClickable: boolean): DataItem {
        const olFeatures = this.map.getFeaturesAtPixel(
            pixel,
            {layerFilter: this.isClickableLayer.bind(this), hitTolerance: this.HIT_TOLERANCE_PIXELS}
        );
        if (!olFeatures) {
            return undefined;
        }

        const dataItems: DataItem[] = [];
        for (const feature of olFeatures) {
            const dataItem = OlFeature.getDataItem(feature as Feature<Geometry>);
            if (dataItem && (onlyClickable === false || OlFeature.isSelectable(feature as Feature<Geometry>))) {
                dataItems.push(dataItem);
            }
        }

        if (dataItems.length === 0) {
            return undefined;
        } else {
            dataItems.sort((item1: DataItem, item2: DataItem) => item1.getClickPrio() - item2.getClickPrio());
        }

        return dataItems[0];
    }


    private isClickableLayer(layer: VectorLayer<Vector<Geometry>> | TileLayer<XYZ>): boolean {
        return layer !== this.baseLayer.layer; // TODO
        /*return (layer === this.routeItemsLayer ||
            layer === this.nonrouteItemsLayer ||
            layer === this.notamLayer ||
            layer === this.flightrouteLayer ||
            layer === this.searchItemLayer ||
            layer === this.trafficLayer);*/
    }

    // endregion


    // region map position / zoom / rotation / extent

    private getZoom(): number {
        return this.map.getView().getZoom();
    }


    private setZoom(zoom: number): void {
        if (this.map && this.getZoom() !== zoom) {
            this.map.getView().setZoom(zoom);
        }
    }


    private getMapPosition(): Position2d {
        const mercPos = this.map.getView().getCenter();
        return OlGeometry.getPosFromMercator([mercPos[0], mercPos[1]]);
    }


    private getRotation(): Angle {
        return new Angle(this.map.getView().getRotation(), AngleUnit.RAD);
    }


    private getExtent(): Extent2d {
        const mercExt = this.map.getView().calculateExtent(this.map.getSize());

        return OlGeometry.getExtentFromMercator([mercExt[0], mercExt[1], mercExt[2], mercExt[3]]);
    }

    // endregion


    // region image

    private showImage(showImageState: ShowImageState) {
        if (!showImageState) {
            return;
        }

        if (showImageState.imageUrl) {
            // show image
            const imageLayer = this.getImageLayer(
                showImageState.imageId,
                showImageState.imageUrl,
                showImageState.extent,
                showImageState.opacity
            );
            this.imageLayers.push(imageLayer);
            const layerIndex = this.IMAGE_LAYER_FIRST_INDEX + this.imageLayers.length - 1;
            this.map.getLayers().insertAt(layerIndex, imageLayer);

            if (showImageState.fitInView) {
                this.fitInView(showImageState.extent);
            }
        } else if (showImageState.imageId) {
            // close single image
            const closeLayer = this.imageLayers.find(layer => layer.get(this.IMAGE_ID_KEY) === showImageState.imageId);
            this.map.removeLayer(closeLayer);
            ArrayHelper.removeFromArray(this.imageLayers, closeLayer);
        } else {
            // close all images
            while (this.imageLayers.length > 0) {
                const layer = this.imageLayers.pop();
                this.map.removeLayer(layer);
            }
        }
    }


    private getImageLayer(imageId: number, imageUrl: string, extent2d: Extent2d, opacity: number): ImageLayer<ImageStatic> {
        const extent = OlGeometry.getExtentAsMercator(extent2d);
        const projection = new Projection({
            code: 'chart',
            units: 'm',
            extent: extent
        });
        const imageLayer = new ImageLayer({
            source: new ImageStatic({
                url: imageUrl,
                projection: projection,
                imageExtent: extent
            }),
            extent: extent,
            opacity: opacity,
        });
        imageLayer.set(this.IMAGE_ID_KEY, imageId);

        return imageLayer;
    }


    private fitInView(extent: Extent2d) {
        const oversizeExtent = extent.getOversizeExtent(1.1);
        this.map.getView().fit(OlGeometry.getExtentAsMercator(oversizeExtent));
    }

    // endregion
}
