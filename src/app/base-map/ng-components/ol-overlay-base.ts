import {AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, Output} from '@angular/core';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {WmmHelper} from '../../common/geo-math/domain-service/wmm-helper';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import Overlay from 'ol/Overlay';


@Directive()
export abstract class OlOverlayBase implements AfterViewInit {
    @Output() close = new EventEmitter();
    public olOverlay: Overlay;


    public constructor(private readonly cdRef: ChangeDetectorRef) {
    }


    public abstract get containerHtmlElement(): HTMLElement;



    public ngAfterViewInit(): void {
        this.olOverlay = new Overlay({
            element: this.containerHtmlElement,
            autoPan: true,
            autoPanAnimation: {duration: 250}
        });
    }


    public setDataItem(dataItem: DataItem, clickPos: Position2d) {
        this.bindDataItem(dataItem, clickPos);
        this.cdRef.markForCheck();
    }


    protected abstract bindDataItem(dataItem: DataItem, clickPos: Position2d);


    public closeOverlay() {
        if (this.olOverlay) {
            this.olOverlay.setPosition(undefined);
        }
        this.setDataItem(undefined, undefined);
    }


    public onCloseOverlay() {
        this.closeOverlay();
        this.close.emit();
    }


    public getPositionString(pos: Position2d): string {
        return StringnumberHelper.getDmsString(pos.toArray());
    }


    public getElevationString(elevation: Length): string {
        return Math.round(elevation.ft) + ' ft'; // TODO
    }


    public getVariationString(pos: Position2d): string {
        const magVar = WmmHelper.calcMagneticVariation(pos);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
