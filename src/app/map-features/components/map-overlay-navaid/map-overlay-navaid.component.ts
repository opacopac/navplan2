import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StringnumberService } from '../../../shared/services/stringnumber/stringnumber.service';
import { Navaid } from '../../model/navaid';
import { Position2d } from '../../../shared/model/geometry/position2d';
import { MapOverlayContainer } from '../../../shared/components/map-overlay-container';
import {environment} from '../../../../environments/environment';


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


    public getAvatarUrl(): string {
        const src = environment.iconBaseUrl;

        switch (this.navaid.type) {
            case 'NDB':
                return src + 'navaid_ndb.png';
            case 'VOR-DME':
            case 'DVOR-DME':
                return src + 'navaid_vor-dme2.svg';
            case 'VOR':
            case 'DVOR':
                return src + 'navaid_vor2.svg';
            case 'DME':
                return src + 'navaid_dme2.svg';
            case 'TACAN':
                return src + 'navaid_tacan.png';
            case 'VORTAC':
            case 'DVORTAC':
                return src + 'navaid_vortac.png';
            default:
                return undefined;
        }
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
