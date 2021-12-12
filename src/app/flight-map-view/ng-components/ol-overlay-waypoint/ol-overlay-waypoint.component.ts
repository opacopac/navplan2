import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../geo-physics/domain-model/geometry/position2d';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {OlOverlayBaseComponent} from '../../../base-map-view/ng-components/ol-overlay-base.component';
import {IWmmService} from '../../../geo-physics/domain-service/wmm/i-wmm.service';


@Component({
    selector: 'app-ol-overlay-waypoint',
    templateUrl: './ol-overlay-waypoint.component.html',
    styleUrls: ['./ol-overlay-waypoint.component.css']
})
export class OlOverlayWaypointComponent extends OlOverlayBaseComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    public waypoint: Waypoint;


    public constructor(
        cdRef: ChangeDetectorRef,
        private wmmService: IWmmService
    ) {
        super(cdRef);
    }


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(waypoint: Waypoint, clickPos: Position2d) {
        this.waypoint = waypoint;
        this.setPosition(waypoint ? waypoint.position : undefined);
        this.markForCheck();
    }


    public getPositionString(pos: Position2d): string {
        return StringnumberHelper.getDmsString(pos);
    }


    public getVariationString(pos: Position2d): string {
        const magVar = this.wmmService.calcMagneticVariation(pos);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
