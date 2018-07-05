import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StringnumberService } from '../../../core/services/utils/stringnumber.service';
import { Navaid } from '../../../model/navaid';
import { Position2d } from '../../../model/geometry/position2d';
import { MapOverlayContainer } from '../map-overlay-container';
import {SessionService} from '../../../core/services/session/session.service';
import {Sessioncontext} from '../../../model/session/sessioncontext';


@Component({
    selector: 'app-map-overlay-navaid',
    templateUrl: './map-overlay-navaid.component.html',
    styleUrls: ['./map-overlay-navaid.component.css']
})
export class MapOverlayNavaidComponent extends MapOverlayContainer implements OnInit {
    public navaid: Navaid;
    public session: Sessioncontext;
    @ViewChild('container') container: ElementRef;


    constructor(
        private sessionService: SessionService
    ) {
        super();
        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public getContainerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(navaid: Navaid, clickPos: Position2d) {
        this.clickPos = clickPos;
        this.navaid = navaid;
    }


    public getPosition(): Position2d {
        return this.navaid.position;
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
