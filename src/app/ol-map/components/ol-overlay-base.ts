import { ChangeDetectorRef, EventEmitter, Output, Directive } from '@angular/core';
import {StringnumberHelper} from '../../system/use-case/stringnumber/stringnumber-helper';
import {DataItem} from '../../shared/model/data-item';
import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {OlMapService} from '../use-case/ol-map.service';
import {WmmHelper} from '../../geo-math/use-case/wmm-helper';
import {Length} from '../../geo-math/domain/quantities/length';
import {LengthUnit} from '../../geo-math/domain/quantities/units';
import Overlay from 'ol/Overlay';


@Directive()
export abstract class OlOverlayBase {
    @Output() close = new EventEmitter();
    public olOverlay: Overlay;


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
        return StringnumberHelper.getDmsString(pos.toArray());
    }


    public getElevationString(elevation_m: number): string {
        return Math.round(Length.convert(elevation_m, LengthUnit.M, LengthUnit.FT)) + 'ft'; // TODO
    }


    public getVariationString(pos: Position2d): string {
        const magVar = WmmHelper.calcMagneticVariation(pos);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
