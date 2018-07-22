import {EventEmitter, Output} from '@angular/core';
import {UnitconversionService} from '../services/unitconversion/unitconversion.service';
import {StringnumberService} from '../services/stringnumber/stringnumber.service';
import {DataItem} from '../model/data-item';
import {Position2d} from '../model/geometry/position2d';
import {MapContext} from '../../map/model/map-context';


export abstract class MapOverlayContainer {
    public olOverlay: ol.Overlay;
    @Output() close = new EventEmitter();


    public abstract get containerHtmlElement(): HTMLElement;


    public init(mapContext: MapContext) {
        this.olOverlay = mapContext.mapService.addOverlay(this.containerHtmlElement);
    }


    public abstract bindFeatureData(dataItem: DataItem, clickPos: Position2d);


    public closeOverlay() {
        this.olOverlay.setPosition(undefined);
        this.bindFeatureData(undefined, undefined);
    }


    public onCloseOverlay() {
        this.closeOverlay();
        this.close.emit();
    }


    public getPositionString(pos: Position2d): string {
        return StringnumberService.getDmsString(pos.getLonLat());
    }


    public getElevationString(elevation_m: number): string {
        return Math.round(UnitconversionService.m2ft(elevation_m)) + 'ft'; // TODO
    }
}
