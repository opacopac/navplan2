import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import Overlay from 'ol/Overlay';


@Component({ template: '' })
export abstract class OlOverlayBaseComponent implements AfterViewInit {
    @Output() close = new EventEmitter();
    public olOverlay: Overlay;


    public constructor(private readonly cdRef: ChangeDetectorRef) {
    }


    public abstract get containerHtmlElement(): HTMLElement;



    public ngAfterViewInit(): void {
        this.olOverlay = new Overlay({
            element: this.containerHtmlElement,
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
}
