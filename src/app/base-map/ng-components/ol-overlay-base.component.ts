import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import Overlay from 'ol/Overlay';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {OlGeometry} from '../ol-model/ol-geometry';


@Component({ template: '' })
export abstract class OlOverlayBaseComponent implements AfterViewInit {
    public olOverlay: Overlay;


    public constructor(private readonly cdRef: ChangeDetectorRef) {
    }


    public abstract get containerHtmlElement(): HTMLElement;


    public ngAfterViewInit(): void {
        this.olOverlay = new Overlay({
            element: this.containerHtmlElement,
        });
    }


    public setPosition(position: Position2d): void {
        if (this.olOverlay) {
            this.olOverlay.setPosition(position ? OlGeometry.getMercator(position) : undefined);
        }
    }


    public markForCheck() {
        this.cdRef.markForCheck();
    }


    public closeOverlay() {
        this.setPosition(undefined);
    }
}
