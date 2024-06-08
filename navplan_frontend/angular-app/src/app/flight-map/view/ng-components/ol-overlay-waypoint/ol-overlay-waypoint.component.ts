import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {OlOverlayBaseComponent} from '../../../../base-map/view/ng-components/ol-overlay-base.component';


@Component({
    selector: 'app-ol-overlay-waypoint',
    templateUrl: './ol-overlay-waypoint.component.html',
    styleUrls: ['./ol-overlay-waypoint.component.scss']
})
export class OlOverlayWaypointComponent extends OlOverlayBaseComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    public waypoint: Waypoint;


    public constructor(
        cdRef: ChangeDetectorRef,
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
}
