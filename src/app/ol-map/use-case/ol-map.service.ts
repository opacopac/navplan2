import {Feature, Map, MapBrowserEvent, MapEvent, View} from 'ol';
import {EventEmitter, Injectable} from '@angular/core';
import {OlBaselayerFactory, MapbaselayerType} from '../domain/ol-baselayer-factory';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {Angle} from '../../geo-math/domain/quantities/angle';
import {AngleUnit} from '../../geo-math/domain/quantities/units';
import {DataItem} from '../../shared/model/data-item';
import {OlComponentBase} from '../ol/ol-component-base';
import {OlHelper} from './ol-helper';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import {Attribution, FullScreen, Rotate, ScaleLine} from 'ol/control';
import {Tile, Vector} from 'ol/source';
import {ObjectEvent} from 'ol/Object';
import {Layer} from 'ol/layer';
import {Pixel} from 'ol/pixel';


const HIT_TOLERANCE_PIXELS = 10;


@Injectable({
    providedIn: 'root'
})
export class OlMapService {
    public map: Map;
    private mapLayer: TileLayer;
    private customLayers: VectorLayer[] = [];
    public onMapMovedZoomedRotated = new EventEmitter<{ position: Position2d, zoom: number, rotation: Angle, extent: Extent2d }>();
    public onMapClicked = new EventEmitter<{ clickPos: Position2d, dataItem: DataItem }>();
    private currentOverlay: Overlay;


    constructor() {
    }


    // region init / uninit

    public initMap(baseMapType: MapbaselayerType,
                   position: Position2d,
                   zoom: number,
                   mapRotation: Angle) {

        this.mapLayer = OlBaselayerFactory.create(baseMapType);
        this.customLayers = [];
        this.map = new Map({
            target: 'map',
            controls: [
                new Attribution(),
                new FullScreen(),
                new ScaleLine(),
                new Rotate()
            ],
            layers: [
                this.mapLayer,
            ],
            view: new View({
                center: OlHelper.getMercator(position),
                zoom: zoom,
                rotation: mapRotation.rad,
            })
        });


        // map events
        this.map.on('singleclick', this.onSingleClick.bind(this));
        this.map.on('pointermove', this.onPointerMove.bind(this));
        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.getView().on('change:rotation', this.onMapRotation.bind(this));


        // add snap interaction (must be added last, see: https://openlayers.org/en/latest/examples/snap.html)
        // this.addSnapInteractions(this.routeItemsLayer.getSource());
    }


    public uninitMap() {
        this.map.un('singleclick', this.onSingleClick.bind(this));
        this.map.un('pointermove', this.onPointerMove.bind(this));
        this.map.un('moveend', this.onMoveEnd.bind(this));
        this.map.getView().un('change:rotation', this.onMapRotation.bind(this));
        this.map.setTarget(undefined);
        this.map = undefined;
    }


    public addVectorLayer(imageRenderMode: boolean): VectorLayer {
        const layer = this.createEmptyVectorLayer(imageRenderMode);
        this.customLayers.push(layer);

        this.map.addLayer(layer);

        return layer;
    }


    private createEmptyVectorLayer(imageRenderMode: boolean = false): VectorLayer {
        return new VectorLayer({
            source: new Vector({}),
            renderMode: imageRenderMode ? 'image' : undefined
        });
    }


    // endregion


    // region map position / zoom / rotation / extent


    public getZoom(): number {
        return this.map.getView().getZoom();
    }


    public setZoom(zoom: number) {
        const minZoom = (this.mapLayer.getSource() as Tile).getTileGrid().getMinZoom();
        const maxZoom = (this.mapLayer.getSource() as Tile).getTileGrid().getMaxZoom();
        if (zoom >= minZoom && zoom <= maxZoom) {
            return this.map.getView().setZoom(zoom);
        }
    }


    public zoomIn() {
        const zoom = this.map.getView().getZoom();
        this.setZoom(zoom + 1);
    }


    public zoomOut() {
        const zoom = this.map.getView().getZoom();
        this.setZoom(zoom - 1);
    }


    public getMapPosition(): Position2d {
        const mercPos = this.map.getView().getCenter();
        return OlHelper.getPosFromMercator([mercPos[0], mercPos[1]]);
    }


    public setPosition(position: Position2d, zoom?: number) {
        if (!this.map || !this.map.getView()) {
            return;
        }

        if (position) {
            this.map.getView().setCenter(OlHelper.getMercator(position));
        }

        if (zoom != null) {
            this.map.getView().setZoom(zoom);
        }
    }


    public getRotation(): Angle {
        return new Angle(this.map.getView().getRotation(), AngleUnit.RAD);
    }


    public getExtent(): Extent2d {
        const mercExt = this.map.getView().calculateExtent(this.map.getSize());

        return Extent2d.createFromMercator([mercExt[0], mercExt[1], mercExt[2], mercExt[3]]);
    }


    public getRadiusDegByPixel(position: Position2d, radiusPixel: number): number {
        const coord1Pixel = this.map.getPixelFromCoordinate(OlHelper.getMercator(position));
        const coord2Pixel: Pixel = [coord1Pixel[0], coord1Pixel[1] - radiusPixel];
        const mercPos = this.map.getCoordinateFromPixel(coord2Pixel);
        const coord2Deg = OlHelper.getPosFromMercator([mercPos[0], mercPos[1]]);

        return Math.abs(coord2Deg.latitude - position.latitude);

        /*const clickPos = [event.pixel[0], event.pixel[1]];
        const coord1 = this.map.getCoordinateFromPixel(clickPos);
        const lat1 = toLonLat(coord1)[1];

        clickPos[1] -= 50;
        const coord2 = map.getCoordinateFromPixel(clickPos);
        const lat2 = toLonLat(coord2)[1];

        return Math.abs(lat2 - lat1);*/
    }


    // endregion


    // region overlays


    public addOverlay(container: HTMLElement): Overlay {
        const overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: { duration: 250 }
        });

        this.map.addOverlay(overlay);

        return overlay;
    }


    public addOverlayOld(coordinates: Position2d, container: HTMLElement, autoPan: boolean) {
        if (this.currentOverlay) {
            this.closeOverlay();
        }

        if (container.style.visibility === 'hidden') {
            container.style.visibility = 'visible';
        }

        this.currentOverlay = new Overlay({
            element: container,
            autoPan: autoPan,
            autoPanAnimation: { duration: 250 }
        });

        this.map.addOverlay(this.currentOverlay);
        this.currentOverlay.setPosition(OlHelper.getMercator(coordinates)); // force auto panning
    }


    public closeOverlay() {
        if (!this.currentOverlay) {
            return;
        }

        this.map.removeOverlay(this.currentOverlay);
        this.currentOverlay = undefined;
    }

    // endregion


    // region map events

    private onMoveEnd(event: MapEvent) {
        this.emitPosZoomRotEvent();
    }


    private onMapRotation(event: ObjectEvent) {
        this.emitPosZoomRotEvent();
    }


    private emitPosZoomRotEvent() {
        this.onMapMovedZoomedRotated.emit({
            position: this.getMapPosition(),
            zoom: this.getZoom(),
            rotation: this.getRotation(),
            extent: this.getExtent()
        });
    }


    private onSingleClick(event: MapBrowserEvent) {
        const dataItem = this.getDataItemAtPixel(event.pixel, true);
        const eventPos = event.coordinate;
        const clickPos = OlHelper.getPosFromMercator([eventPos[0], eventPos[1]]);
        this.onMapClicked.emit({ clickPos: clickPos, dataItem: dataItem });
    }


    private onPointerMove(event: MapBrowserEvent) {
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
        const olFeatures = this.map.getFeaturesAtPixel(pixel,
            { layerFilter: this.isClickableLayer.bind(this), hitTolerance: HIT_TOLERANCE_PIXELS });
        if (!olFeatures) {
            return undefined;
        }

        const dataItems: DataItem[] = [];
        for (const feature of olFeatures) {
            const dataItem = OlComponentBase.getDataItem(feature as Feature);
            if (dataItem && (onlyClickable === false || OlComponentBase.isSelectable(feature as Feature))) {
                dataItems.push(dataItem);
            }
        }

        if (dataItems.length === 0) {
            return undefined;
        } else {
            dataItems.sort(this.clickPrioComparer);
        }

        return dataItems[0];
    }


    private isClickableLayer(layer: Layer): boolean {
        return layer !== this.mapLayer;
        /*return (layer === this.routeItemsLayer ||
            layer === this.nonrouteItemsLayer ||
            layer === this.notamLayer ||
            layer === this.flightrouteLayer ||
            layer === this.searchItemLayer ||
            layer === this.trafficLayer);*/
    }


    private clickPrioComparer(item1: DataItem, item2: DataItem): number {
        return item1.getClickPrio() - item2.getClickPrio();
    }

    // endregion
}
