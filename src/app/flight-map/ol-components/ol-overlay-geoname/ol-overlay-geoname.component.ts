import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Geoname} from '../../../geoname/domain-model/geoname';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {WaypointFactory} from '../../../flightroute/domain-model/waypoint-mapper/waypoint-factory';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


@Component({
    selector: 'app-ol-overlay-geoname',
    templateUrl: './ol-overlay-geoname.component.html',
    styleUrls: ['./ol-overlay-geoname.component.css']
})
export class OlOverlayGeonameComponent extends OlOverlayWaypointBase implements OnInit {
    public geoname: Geoname;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(geoname: Geoname, clickPos: Position2d) {
        this.geoname = geoname;
        this.waypoint = geoname ? WaypointFactory.createNewWaypointFromDataItem(geoname, clickPos) : undefined;
        this.olOverlay.setPosition(geoname ? OlHelper.getMercator(geoname.position) : undefined);
    }


    public getTypeString(): string {
        if (this.geoname.feature_class === 'P') {
            return this.geoname.getClassDescription();
        } else {
            return this.geoname.getFeatureDescription();
        }
    }


    public getAdminString(): string {
        if (this.geoname.admin1) {
            return this.geoname.admin1 + ', ' + this.geoname.country;
        } else {
            return this.geoname.country;
        }
    }
}
