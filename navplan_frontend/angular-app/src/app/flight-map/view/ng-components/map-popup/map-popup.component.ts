import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {MetarTaf} from '../../../../metar-taf/domain/model/metar-taf';
import {DataItem} from '../../../../common/domain/model/data-item';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {Navaid} from '../../../../navaid/domain/model/navaid';
import {Geoname} from '../../../../geoname/domain/model/geoname';
import {ReportingPoint} from '../../../../aerodrome-reporting/domain/model/reporting-point';
import {ReportingSector} from '../../../../aerodrome-reporting/domain/model/reporting-sector';
import {UserPoint} from '../../../../user-point/domain/model/user-point';
import {Notam} from '../../../../notam/domain/model/notam';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import Overlay from 'ol/Overlay';
import {OverlayState} from '../../../state/ngrx/overlay-state';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {OlGeometry} from '../../../../base-map/view/ol-model/ol-geometry';
import {timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card';
import {
    MapPopupAirportHeaderComponent
} from '../../../../aerodrome/view/ng-components/map-popup-airport-header/map-popup-airport-header.component';
import {
    MapPopupReportingpointHeaderComponent
} from '../../../../aerodrome-reporting/view/ng-components/map-popup-reportingpoint-header/map-popup-reportingpoint-header.component';
import {
    MapPopupReportingsectorHeaderComponent
} from '../../../../aerodrome-reporting/view/ng-components/map-popup-reportingsector-header/map-popup-reportingsector-header.component';
import {
    MapPopupNavaidHeaderComponent
} from '../../../../navaid/view/ng-components/map-popup-navaid-header/map-popup-navaid-header.component';
import {
    MapPopupGeonameHeaderComponent
} from '../../../../geoname/view/ng-components/map-popup-geoname-header/map-popup-geoname-header.component';
import {
    MapPopupUserpointHeaderComponent
} from '../../../../user-point/view/ng-components/map-popup-userpoint-header/map-popup-userpoint-header.component';
import {MapPopupWaypointHeaderComponent} from '../map-popup-waypoint-header/map-popup-waypoint-header.component';
import {
    MapPopupAirportInfoTabComponent
} from '../../../../aerodrome/view/ng-components/map-popup-airport-info-tab/map-popup-airport-info-tab.component';
import {
    MapPopupReportingpointInfoTabComponent
} from '../../../../aerodrome-reporting/view/ng-components/map-popup-reportingpoint-info-tab/map-popup-reportingpoint-info-tab.component';
import {
    MapPopupReportingsectorInfoTabComponent
} from '../../../../aerodrome-reporting/view/ng-components/map-popup-reportingsector-info-tab/map-popup-reportingsector-info-tab.component';
import {
    MapPopupNavaidInfoTabComponent
} from '../../../../navaid/view/ng-components/map-popup-navaid-info-tab/map-popup-navaid-info-tab.component';
import {
    MapPopupGeonameInfoTabComponent
} from '../../../../geoname/view/ng-components/map-popup-geoname-info-tab/map-popup-geoname-info-tab.component';
import {
    MapPopupUserpointInfoTabComponent
} from '../../../../user-point/view/ng-components/map-popup-userpoint-info-tab/map-popup-userpoint-info-tab.component';
import {MapPopupWaypointInfoTabComponent} from '../map-popup-waypoint-info-tab/map-popup-waypoint-info-tab.component';
import {
    MapPopupAirportRunwayTabComponent
} from '../../../../aerodrome/view/ng-components/map-popup-airport-runway-tab/map-popup-airport-runway-tab.component';
import {
    MapPopupAirportRadioTabComponent
} from '../../../../aerodrome/view/ng-components/map-popup-airport-radio-tab/map-popup-airport-radio-tab.component';
import {
    MapPopupMeteogramComponent
} from '../../../../meteo-gram/view/ng-components/map-popup-meteogram/map-popup-meteogram.component';
import {
    MapPopupPrecipTempGraphComponent
} from '../../../../meteo-gram/view/ng-components/map-popup-precip-temp-graph/map-popup-precip-temp-graph.component';
import {
    MapPopupMetarTafComponent
} from '../../../../metar-taf/view/ng-components/map-popup-metar-taf/map-popup-metar-taf.component';
import {
    MapPopupNotamTabComponent
} from '../../../../notam/view/ng-components/map-popup-notam-tab/map-popup-notam-tab.component';
import {
    MapPopupAirportChartTabComponent
} from '../../../../aerodrome-charts/view/ng-components/map-popup-airport-chart-tab/map-popup-airport-chart-tab.component';
import {
    MapPopupWaypointButtonContainerComponent
} from '../map-popup-waypoint-button-container/map-popup-waypoint-button-container.component';
import {User} from '../../../../user/domain/model/user';


@Component({
    selector: 'app-map-popup',
    imports: [
        MatCardModule,
        MatTabsModule,
        MapPopupAirportHeaderComponent,
        MapPopupReportingpointHeaderComponent,
        MapPopupReportingsectorHeaderComponent,
        MapPopupNavaidHeaderComponent,
        MapPopupGeonameHeaderComponent,
        MapPopupUserpointHeaderComponent,
        MapPopupWaypointHeaderComponent,
        MapPopupAirportInfoTabComponent,
        MapPopupReportingpointInfoTabComponent,
        MapPopupReportingsectorInfoTabComponent,
        MapPopupNavaidInfoTabComponent,
        MapPopupGeonameInfoTabComponent,
        MapPopupUserpointInfoTabComponent,
        MapPopupWaypointInfoTabComponent,
        MapPopupAirportRunwayTabComponent,
        MapPopupAirportRadioTabComponent,
        MapPopupMeteogramComponent,
        MapPopupPrecipTempGraphComponent,
        MapPopupMetarTafComponent,
        MapPopupNotamTabComponent,
        MapPopupAirportChartTabComponent,
        MapPopupWaypointButtonContainerComponent
    ],
    templateUrl: './map-popup.component.html',
    styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements AfterViewInit {
    @ViewChild('container') container: ElementRef;
    @ViewChild('tabGroup') tabGroup: MatTabGroup;
    @Input() currentUser: User;
    public olOverlay: Overlay;
    public position: Position2d;
    public dataItem: DataItem;
    public waypoint: Waypoint;
    public metarTaf: MetarTaf;
    public notams: Notam[];


    public constructor(private readonly cdRef: ChangeDetectorRef) {
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


    public get waypointItem(): Waypoint {
        return this.dataItem instanceof Waypoint ? this.dataItem as Waypoint : undefined;
    }


    public ngAfterViewInit(): void {
        this.olOverlay = new Overlay({
            element: this.container.nativeElement,
        });
    }


    public showOverlay(state: OverlayState) {
        this.dataItem = state.dataItem;
        this.metarTaf = state.metarTaf;
        this.notams = state.notams;
        this.tabGroup.selectedIndex = state.tabIndex;

        if (state.dataItem) {
            this.position = state.dataItem.getPosition() ? state.dataItem.getPosition() : state.clickPos;
            this.olOverlay.setPosition(OlGeometry.getMercator(this.position));
        } else {
            this.position = undefined;
            this.olOverlay.setPosition(undefined);
        }

        this.cdRef.markForCheck();

        if (this.position) {
            this.panIntoView(this.olOverlay);
        }
    }


    public closeOverlay() {
        this.showOverlay({
            clickPos: undefined,
            dataItem: undefined,
            waypoint: undefined,
            metarTaf: undefined,
            notams: [],
            tabIndex: 0
        });
    }


    private panIntoView(overlay: Overlay) {
        timer(0).pipe(
            tap(x => overlay.panIntoView({
                margin: 20,
                animation: {duration: 250}
            }))
        ).subscribe();
    }
}
