import { EventEmitter, Output } from '@angular/core';
import { UnitconversionService } from '../../services/utils/unitconversion.service';
import { StringnumberService } from '../../services/utils/stringnumber.service';
import { DataItem } from '../../model/data-item';
import { Position2d } from '../../model/geometry/position2d';


export abstract class MapOverlayContainer {
    public clickPos: Position2d;
    @Output() close = new EventEmitter();


    public abstract bindFeatureData(dataItem: DataItem, clickPos: Position2d);


    public abstract getContainerHtmlElement(): HTMLElement;


    public abstract getPosition(): Position2d;


    public closeOverlay() {
        this.bindFeatureData(undefined, undefined);
        this.close.emit();
    }


    public getPositionString(pos: Position2d): string {
        return StringnumberService.getDmsString(pos.getLonLat());
    }


    public getElevationString(elevation_m: number): string {
        return Math.round(UnitconversionService.m2ft(elevation_m)) + 'ft';
    }
}
