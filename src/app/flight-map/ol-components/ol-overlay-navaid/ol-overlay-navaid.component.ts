import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {Navaid} from '../../../navaid/domain-model/navaid';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {OlNavaidIcon} from '../../../navaid/ol-components/ol-navaid-icon';
import {WaypointFactory} from '../../../flightroute/domain-model/waypoint-mapper/waypoint-factory';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


@Component({
    selector: 'app-ol-overlay-navaid',
    templateUrl: './ol-overlay-navaid.component.html',
    styleUrls: ['./ol-overlay-navaid.component.css']
})
export class OlOverlayNavaidComponent extends OlOverlayWaypointBase implements OnInit {
    public navaid: Navaid;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(navaid: Navaid, clickPos: Position2d) {
        this.navaid = navaid;
        this.waypoint = navaid ? WaypointFactory.createNewWaypointFromDataItem(navaid, clickPos) : undefined;
        this.olOverlay.setPosition(navaid ? OlHelper.getMercator(navaid.position) : undefined);
    }


    public getAvatarUrl(): string {
        return OlNavaidIcon.getUrl(this.navaid.type);
    }


    public getMorseString(): string {
        if (!this.navaid.kuerzel) {
            return;
        }

        const dotHtml = ' <b>&middot;</b> ';
        const dashHtml = ' <b>&#8211;</b> ';
        const spacer = '&nbsp;&nbsp;&nbsp;';
        let out = '';

        for (let i = 0; i < this.navaid.kuerzel.length; i++) {
            const letter = this.navaid.kuerzel.substring(i, i + 1).toUpperCase();
            let code = StringnumberHelper.getMorseString(letter);
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
