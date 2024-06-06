import {Feature, Map, MapBrowserEvent, MapEvent, View} from 'ol';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {OlGeometry} from './ol-geometry';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {AngleUnit} from '../../../geo-physics/domain/model/quantities/angle-unit';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Observable, Subject} from 'rxjs';
import {DataItem} from '../../../common/model/data-item';
import {ObjectEvent} from 'ol/Object';
import {Pixel} from 'ol/pixel';
import {OlFeature} from './ol-feature';
import {Geometry} from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import {ImageStatic} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorTileLayer from 'ol/layer/VectorTile';
import {MouseWheelZoom} from 'ol/interaction';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';
import Overlay from 'ol/Overlay';
import {OlBaselayerFactory} from '../ol-service/ol-baselayer-factory';
import {ScaleLine} from 'ol/control';
import {OlBaseLayer} from './ol-base-layer';
import {ShowImageState} from '../../state/state-model/show-image-state';
import {ArrayHelper} from '../../../system/domain/service/array/array-helper';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import {OlLayer} from './ol-layer';
import {IBaseMap} from '../../domain/model/i-base-map';
import {FeatureLike} from 'ol/Feature';


export class OlMap implements IBaseMap {
    private static readonly DEFAULT_BASE_LAYER = MapBaseLayerType.OPENTOPOMAP;
    private static readonly HIT_TOLERANCE_PIXELS = 10;
    private static readonly IMAGE_LAYER_FIRST_INDEX = 1;
    private static readonly IMAGE_ID_KEY = 'imageId';

    public readonly map: Map;
    private baseLayer: OlBaseLayer;
    private readonly imageLayers: ImageLayer<ImageStatic>[] = [];
    private readonly _mapClick$ = new Subject<[Position2d, DataItem]>();
    private readonly _mapMove$ = new Subject<void>();


    public get mapClick$(): Observable<[Position2d, DataItem]> {
        return this._mapClick$;
    }


    public get mapMove$(): Observable<void> {
        return this._mapMove$;
    }


    public constructor(
        mapHtmlId: string,
        featureLayers: OlLayer[],
        mapOverlays: Overlay[],
        position: Position2d,
        zoom: number,
        mapRotation: Angle
    ) {
        this.baseLayer = OlBaselayerFactory.create(OlMap.DEFAULT_BASE_LAYER);
        const allLayers = [];
        allLayers.push(this.baseLayer.layer); // TODO
        allLayers.push(...featureLayers.map(layer => layer.getLayer()));
        this.map = new Map({
            target: mapHtmlId,
            controls: [
                new ScaleLine()
            ],
            layers: allLayers,
            overlays: mapOverlays,
            view: new View({
                center: OlGeometry.getMercator(position),
                zoom: zoom,
                rotation: mapRotation.rad,
            }),
        });

        this.addInteractions();
        this.initMapEvents();
    }


    private addInteractions(): void {
        this.map.addInteraction(
            new MouseWheelZoom({constrainResolution: true})
        );
    }


    private initMapEvents(): void {
        this.map.on('singleclick', this.onSingleClick.bind(this));
        this.map.on('pointermove', this.onPointerMove.bind(this));
        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.getView().on('change:rotation', this.onMapRotation.bind(this));
    }


    public uninit(): void {
        this.map.un('singleclick', this.onSingleClick.bind(this));
        this.map.un('pointermove', this.onPointerMove.bind(this));
        this.map.un('moveend', this.onMoveEnd.bind(this));
        this.map.getView().un('change:rotation', this.onMapRotation.bind(this));
        this.map.setTarget(undefined);
    }


    // region map position / zoom / rotation / extent

    public getZoom(): number {
        return this.map.getView().getZoom();
    }


    public setZoom(zoom: number): void {
        this.map.getView().setZoom(zoom);
    }


    public getMapPosition(): Position2d {
        const mercPos = this.map.getView().getCenter();

        return OlGeometry.getPosFromMercator([mercPos[0], mercPos[1]]);
    }


    public getRotation(): Angle {
        return new Angle(this.map.getView().getRotation(), AngleUnit.RAD);
    }


    public getExtent(): Extent2d {
        const mercExt = this.map.getView().calculateExtent(this.map.getSize());

        return OlGeometry.getExtentFromMercator([mercExt[0], mercExt[1], mercExt[2], mercExt[3]]);
    }

    // endregion


    // region map event handler

    private onMoveEnd(event: MapEvent): void {
        this._mapMove$.next();
    }


    private onMapRotation(event: ObjectEvent): void {
        this._mapMove$.next();
    }


    private onSingleClick(event: MapBrowserEvent<UIEvent>): void {
        const dataItem = this.getDataItemAtPixel(event.pixel, true);
        const eventPos = event.coordinate;
        const clickPos = OlGeometry.getPosFromMercator([eventPos[0], eventPos[1]]);

        this._mapClick$.next([clickPos, dataItem]);
    }


    private onPointerMove(event: MapBrowserEvent<UIEvent>): void {
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
            {layerFilter: this.isClickableLayer.bind(this), hitTolerance: OlMap.HIT_TOLERANCE_PIXELS}
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


    private isClickableLayer(layer: VectorLayer<Feature<Geometry>> | TileLayer<XYZ> | VectorTileLayer<FeatureLike>): boolean {
        return layer !== this.baseLayer.layer; // TODO
        /*return (layer === this.routeItemsLayer ||
            layer === this.nonrouteItemsLayer ||
            layer === this.notamLayer ||
            layer === this.flightrouteLayer ||
            layer === this.searchItemLayer ||
            layer === this.trafficLayer);*/
    }

    // endregion


    // region image

    public showImage(showImageState: ShowImageState): void {
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
            const layerIndex = OlMap.IMAGE_LAYER_FIRST_INDEX + this.imageLayers.length - 1;
            this.map.getLayers().insertAt(layerIndex, imageLayer);

            if (showImageState.fitInView) {
                this.fitInView(showImageState.extent);
            }
        } else if (showImageState.imageId) {
            // close single image
            const closeLayer = this.imageLayers.find(layer => layer.get(OlMap.IMAGE_ID_KEY) === showImageState.imageId);
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
        imageLayer.set(OlMap.IMAGE_ID_KEY, imageId);

        return imageLayer;
    }


    private fitInView(extent: Extent2d): void {
        const oversizeExtent = extent.getOversizeExtent(1.1);
        this.map.getView().fit(OlGeometry.getExtentAsMercator(oversizeExtent));
    }

    // endregion


    // region base layer

    public changeBaseLayer(baseLayerType: MapBaseLayerType): void {
        if (baseLayerType >= 0 && this.map && this.map.getLayers().getLength() > 0) {
            this.baseLayer = OlBaselayerFactory.create(baseLayerType);

            this.map.getLayers().removeAt(0);
            this.map.getLayers().insertAt(0, this.baseLayer.layer);
        }
    }

    // endregion
}
