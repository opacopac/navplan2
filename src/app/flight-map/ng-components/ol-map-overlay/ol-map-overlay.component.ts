import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../../metar-taf/domain-model/metar-taf';
import {DataItem} from '../../../common/model/data-item';
import {Airport} from '../../../aerodrome/domain-model/airport';
import {Navaid} from '../../../enroute/domain-model/navaid';
import {Geoname} from '../../../geoname/domain-model/geoname';
import {ReportingPoint} from '../../../aerodrome/domain-model/reporting-point';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {UserPoint} from '../../../user/domain-model/user-point';
import {Notam} from '../../../notam/domain-model/notam';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';
import Overlay from 'ol/Overlay';
import {OverlayState} from '../../domain-model/overlay-state';
import {MatTabGroup} from '@angular/material/tabs';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';
import {timer} from 'rxjs';
import {tap} from 'rxjs/operators';


@Component({
    selector: 'app-ol-map-overlay',
    templateUrl: './ol-map-overlay.component.html',
    styleUrls: ['./ol-map-overlay.component.css']
})
export class OlMapOverlayComponent implements AfterViewInit {
    @ViewChild('container') container: ElementRef;
    @ViewChild('tabGroup') tabGroup: MatTabGroup;
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
                animation: { duration: 250 }
            }))
        ).subscribe();
    }
}
