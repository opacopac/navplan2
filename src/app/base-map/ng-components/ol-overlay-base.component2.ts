import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import Overlay from 'ol/Overlay';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


@Component({ template: '' })
export abstract class OlOverlayBase2Component<T> implements AfterViewInit {
    @Output() close = new EventEmitter();
    public olOverlay: Overlay;
    public data: T;


    public constructor(private readonly cdRef: ChangeDetectorRef) {
    }


    public abstract get containerHtmlElement(): HTMLElement;



    public ngAfterViewInit(): void {
        this.olOverlay = new Overlay({
            element: this.containerHtmlElement,
        });
    }


    public bindData(data: T, position: Position2d) {
        this.bindDataImpl(data, position);
        this.cdRef.markForCheck();
    }


    protected abstract bindDataImpl(data: T, position: Position2d);


    public closeOverlay() {
        if (this.olOverlay) {
            this.olOverlay.setPosition(undefined);
        }
        this.bindData(undefined, undefined);
    }


    public onCloseOverlay() {
        this.closeOverlay();
        this.close.emit();
    }
}
