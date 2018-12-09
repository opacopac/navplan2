import * as ol from 'openlayers';
import {EventEmitter, Injectable} from '@angular/core';
import {MapbaselayerFactory, MapbaselayerType} from '../model/mapbaselayer-factory';
import {Extent} from '../../shared/model/extent';
import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';
import {AngleUnit} from '../../shared/model/units';
import {DataItem, DataItemType} from '../../shared/model/data-item';
import {OlComponentBase} from '../ol-component/ol-component-base';


const HIT_TOLERANCE_PIXELS = 10;


@Injectable({
    providedIn: 'root'
})
export class BaseMapService {
    public map: ol.Map;
    private mapLayer: ol.layer.Tile;
    private customLayers: ol.layer.Vector[] = [];
    public onMapMovedZoomedRotated = new EventEmitter<{ position: Position2d, zoom: number, rotation: Angle, extent: Extent }>();
    public onMapClicked = new EventEmitter<{ clickPos: Position2d, dataItem: DataItem }>();
    private currentOverlay: ol.Overlay;


    constructor() {
    }


    // region init / uninit

    public initMap(baseMapType: MapbaselayerType,
                   position: Position2d,
                   zoom: number,
                   mapRotation: Angle) {

        this.mapLayer = MapbaselayerFactory.create(baseMapType);
        this.customLayers = [];
        this.map = new ol.Map({
            target: 'map',
            controls: [
                new ol.control.Attribution(),
                new ol.control.FullScreen(),
                new ol.control.ScaleLine(),
                new ol.control.Rotate()
            ],
            layers: [
                this.mapLayer,
            ],
            view: new ol.View({
                center: position.getMercator(),
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


    public addVectorLayer(imageRenderMode: boolean): ol.layer.Vector {
        const layer = this.createEmptyVectorLayer(imageRenderMode);
        this.customLayers.push(layer);

        this.map.addLayer(layer);

        return layer;
    }


    private createEmptyVectorLayer(imageRenderMode: boolean = false): ol.layer.Vector {
        return new ol.layer.Vector({
            source: new ol.source.Vector({}),
            renderMode: imageRenderMode ? 'image' : undefined
        });
    }


    // endregion


    // region map position / zoom / rotation / extent


    public getZoom(): number {
        return this.map.getView().getZoom();
    }


    public setZoom(zoom: number) {
        const minZoom = (this.mapLayer.getSource() as ol.source.Tile).getTileGrid().getMinZoom();
        const maxZoom = (this.mapLayer.getSource() as ol.source.Tile).getTileGrid().getMaxZoom();
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
        return Position2d.createFromMercator(this.map.getView().getCenter());
    }


    public setPosition(position: Position2d, zoom?: number) {
        if (!this.map || !this.map.getView()) {
            return;
        }

        if (position) {
            this.map.getView().setCenter(position.getMercator());
        }

        if (zoom != null) {
            this.map.getView().setZoom(zoom);
        }
    }


    public getRotation(): Angle {
        return new Angle(this.map.getView().getRotation(), AngleUnit.RAD);
    }


    public getExtent(): Extent {
        return Extent.createFromMercator(this.map.getView().calculateExtent(this.map.getSize()));
    }


    public getRadiusDegByPixel(position: Position2d, radiusPixel: number): number {
        const coord1Pixel = this.map.getPixelFromCoordinate(position.getMercator());
        const coord2Pixel: ol.Pixel = [coord1Pixel[0], coord1Pixel[1] - radiusPixel];
        const coord2Deg = Position2d.createFromMercator(this.map.getCoordinateFromPixel(coord2Pixel));

        return Math.abs(coord2Deg.latitude - position.latitude);

        /*const clickPos = [event.pixel[0], event.pixel[1]];
        const coord1 = this.map.getCoordinateFromPixel(clickPos);
        const lat1 = ol.proj.toLonLat(coord1)[1];

        clickPos[1] -= 50;
        const coord2 = map.getCoordinateFromPixel(clickPos);
        const lat2 = ol.proj.toLonLat(coord2)[1];

        return Math.abs(lat2 - lat1);*/
    }


    // endregion


    // region overlays


    public addOverlay(container: HTMLElement): ol.Overlay {
        const overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: { source: undefined, duration: 250 }
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

        this.currentOverlay = new ol.Overlay({
            element: container,
            autoPan: autoPan,
            autoPanAnimation: { source: undefined, duration: 250 }
        });

        this.map.addOverlay(this.currentOverlay);
        this.currentOverlay.setPosition(coordinates.getMercator()); // force auto panning
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

    private onMoveEnd(event: ol.MapEvent) {
        this.emitPosZoomRotEvent();
    }


    private onMapRotation(event: ol.ObjectEvent) {
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


    private onSingleClick(event: ol.MapBrowserEvent) {
        const dataItem = this.getDataItemAtPixel(event.pixel, true);
        const clickPos = Position2d.createFromMercator(event.coordinate);
        this.onMapClicked.emit({ clickPos: clickPos, dataItem: dataItem });
    }


    private onPointerMove(event: ol.MapBrowserEvent) {
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


    private getDataItemAtPixel(pixel: ol.Pixel, onlyClickable: boolean): DataItem {
        const olFeatures = this.map.getFeaturesAtPixel(pixel,
            { layerFilter: this.isClickableLayer.bind(this), hitTolerance: HIT_TOLERANCE_PIXELS });
        if (!olFeatures) {
            return undefined;
        }

        const dataItems: DataItem[] = [];
        for (const feature of olFeatures) {
            const dataItem = OlComponentBase.getDataItem(feature as ol.Feature);
            if (dataItem && (onlyClickable === false || OlComponentBase.isSelectable(feature as ol.Feature))) {
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


    private isClickableLayer(layer: ol.layer.Layer): boolean {
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
