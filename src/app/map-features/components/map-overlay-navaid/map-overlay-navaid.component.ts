import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StringnumberService } from '../../../shared/services/stringnumber/stringnumber.service';
import { Navaid } from '../../model/navaid';
import { Position2d } from '../../../shared/model/geometry/position2d';
import { MapOverlayContainer } from '../../../shared/components/map-overlay-container';


@Component({
    selector: 'app-map-overlay-navaid',
    templateUrl: './map-overlay-navaid.component.html',
    styleUrls: ['./map-overlay-navaid.component.css']
})
export class MapOverlayNavaidComponent extends MapOverlayContainer implements OnInit {
    public navaid: Navaid;
    @ViewChild('container') container: ElementRef;


    constructor() {
        super();
    }


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(navaid: Navaid, clickPos: Position2d) {
        this.navaid = navaid;
        this.olOverlay.setPosition(navaid ? navaid.position.getMercator() : undefined);
    }


    public getMorseString() {
        if (!this.navaid.kuerzel) {
            return;
        }

        const dotHtml = ' <b>&middot;</b> ';
        const dashHtml = ' <b>&#8211;</b> ';
        const spacer = '&nbsp;&nbsp;&nbsp;';
        let out = '';

        for (let i = 0; i < this.navaid.kuerzel.length; i++) {
            const letter = this.navaid.kuerzel.substring(i, i + 1).toUpperCase();
            let code = StringnumberService.getMorseString(letter);
            code = code.replace(/\./g, dotHtml);
            code = code.replace(/\-/g, dashHtml);

            if (i > 0) {
                out += spacer;
            }

            out += letter + ' ' + code;
        }

        return out;
    }
}
