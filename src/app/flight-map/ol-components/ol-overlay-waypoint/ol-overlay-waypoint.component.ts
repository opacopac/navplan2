import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';
import {OlOverlayBaseComponent} from '../../../base-map/ng-components/ol-overlay-base.component';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {WmmHelper} from '../../../common/geo-math/domain-service/wmm-helper';


@Component({
    selector: 'app-ol-overlay-waypoint',
    templateUrl: './ol-overlay-waypoint.component.html',
    styleUrls: ['./ol-overlay-waypoint.component.css']
})
export class OlOverlayWaypointComponent extends OlOverlayBaseComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    public waypoint: Waypoint;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(waypoint: Waypoint, clickPos: Position2d) {
        this.waypoint = waypoint;
        this.olOverlay.setPosition(waypoint ? OlHelper.getMercator(waypoint.position) : undefined);
    }


    public getPositionString(pos: Position2d): string {
        return StringnumberHelper.getDmsString(pos);
    }


    public getVariationString(pos: Position2d): string {
        const magVar = WmmHelper.calcMagneticVariation(pos);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
