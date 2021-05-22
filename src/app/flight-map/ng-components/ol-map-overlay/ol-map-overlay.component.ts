import {Component, ElementRef, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';
import {MetarTaf} from '../../../metar-taf/domain-model/metar-taf';
import {DataItem} from '../../../common/model/data-item';
import {Airport} from '../../../aerodrome/domain-model/airport';
import {Navaid} from '../../../enroute/domain-model/navaid';
import {Geoname} from '../../../geoname/domain-model/geoname';
import {ReportingPoint} from '../../../aerodrome/domain-model/reporting-point';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {UserPoint} from '../../../user/domain-model/user-point';
import {OlOverlayWaypointBase} from '../../ol-components/ol-overlay-waypoint-base';
import {Notam} from '../../../notam/domain-model/notam';


@Component({
    selector: 'app-ol-map-overlay',
    templateUrl: './ol-map-overlay.component.html',
    styleUrls: ['./ol-map-overlay.component.css']
})
export class OlMapOverlayComponent extends OlOverlayWaypointBase {
    @ViewChild('container') container: ElementRef;
    public position: Position2d;
    public dataItem: DataItem;
    public metarTaf: MetarTaf;
    public notams: Notam[];
    public selectedTabIndex = 0;


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public get airport(): Airport {
        return this.dataItem instanceof Airport ? this.dataItem as Airport : undefined;
    }


    public get geoname(): Geoname {
        return this.dataItem instanceof Geoname ? this.dataItem as Geoname : undefined;
    }


    public get navaid(): Navaid {
        return this.dataItem instanceof Navaid ? this.dataItem as Navaid : undefined;
    }


    public get reportingPoint(): ReportingPoint {
        return this.dataItem instanceof ReportingPoint ? this.dataItem as ReportingPoint : undefined;
    }


    public get reportingSector(): ReportingSector {
        return this.dataItem instanceof ReportingSector ? this.dataItem as ReportingSector : undefined;
    }


    public get userPoint(): UserPoint {
        return this.dataItem instanceof UserPoint ? this.dataItem as UserPoint : undefined;
    }


    public bindDataItem(dataItem: DataItem, clickPos: Position2d) {
        this.dataItem = dataItem;

        if (dataItem) {
            this.position = dataItem.getPosition() ? dataItem.getPosition() : clickPos;
            this.olOverlay.setPosition(OlHelper.getMercator(this.position));
        } else {
            this.position = undefined;
            this.olOverlay.setPosition(undefined);
        }
    }


    public openTab(tabIndex: number) {
        if (tabIndex !== undefined && tabIndex >= 0) {
            this.selectedTabIndex = tabIndex;
        }
    }
}
