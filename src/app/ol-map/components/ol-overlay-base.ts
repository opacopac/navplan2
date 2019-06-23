import * as ol from 'ol';
import {ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {StringnumberService} from '../../shared/services/stringnumber/stringnumber.service';
import {DataItem} from '../../shared/model/data-item';
import {Position2d} from '../../shared/model/geometry/position2d';
import {OlMapService} from '../use-case/ol-map.service';
import {GeocalcService} from '../../shared/services/geocalc/geocalc.service';


export abstract class OlOverlayBase {
    @Output() close = new EventEmitter();
    public olOverlay: ol.Overlay;


    public constructor(private cdRef: ChangeDetectorRef) {
    }


    public abstract get containerHtmlElement(): HTMLElement;


    public init(mapService: OlMapService) {
        this.olOverlay = mapService.addOverlay(this.containerHtmlElement);
    }


    public setDataItem(dataItem: DataItem, clickPos: Position2d) {
        this.bindDataItem(dataItem, clickPos);
        this.cdRef.markForCheck();
    }


    protected abstract bindDataItem(dataItem: DataItem, clickPos: Position2d);


    public closeOverlay() {
        this.olOverlay.setPosition(undefined);
        this.setDataItem(undefined, undefined);
    }


    public onCloseOverlay() {
        this.closeOverlay();
        this.close.emit();
    }


    public getPositionString(pos: Position2d): string {
        return StringnumberService.getDmsString(pos.toArray());
    }


    public getElevationString(elevation_m: number): string {
        return Math.round(UnitconversionService.m2ft(elevation_m)) + 'ft'; // TODO
    }


    public getVariationString(pos: Position2d): string {
        const magVar = GeocalcService.calcMagneticVariation(pos);
        return StringnumberService.getEWString(magVar, 1);
    }
}
