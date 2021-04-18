import {AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, Output} from '@angular/core';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {OlBaseMapService} from '../ol-service/ol-base-map.service';
import {WmmHelper} from '../../common/geo-math/domain-service/wmm-helper';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {LengthUnit} from '../../common/geo-math/domain-model/quantities/units';
import Overlay from 'ol/Overlay';


@Directive()
export abstract class OlOverlayBase implements AfterViewInit {
    @Output() close = new EventEmitter();
    public olOverlay: Overlay;


    public constructor(
        private readonly cdRef: ChangeDetectorRef,
        private readonly mapService: OlBaseMapService
    ) {
    }


    ngAfterViewInit() {
        this.olOverlay = this.mapService.addOverlay(this.containerHtmlElement);
    }


    public abstract get containerHtmlElement(): HTMLElement;


    public init(mapService: OlBaseMapService) {
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
