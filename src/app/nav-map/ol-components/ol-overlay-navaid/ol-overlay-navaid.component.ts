import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {Navaid} from '../../../open-aip/domain/navaid';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {NavaidIcon} from '../../../open-aip/domain/navaid-icon';
import {WaypointFactory} from '../../../flightroute/domain/waypoint-mapper/waypoint-factory';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {OlHelper} from '../../../ol-map/use-case/ol-helper';


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
        return NavaidIcon.getUrl(this.navaid.type);
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
