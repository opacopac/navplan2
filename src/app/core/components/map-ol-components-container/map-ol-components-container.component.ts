import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlOwnPlaneContainer} from '../../../location/ol-components/ol-own-plane-container';
import {OlFlightrouteContainer} from '../../../flightroute/ol-components/ol-flightroute-container';
import {OlMetarContainer} from '../../../metar-taf/ol-components/ol-metar-container';
import {OlTrafficContainer} from '../../../traffic/ol-components/ol-traffic-container';
import {OlMapFeaturesContainer} from '../../../map-features/ol-components/ol-map-features-container';
import {OlNotamContainer} from '../../../notam/ol-component/ol-notam-container';
import {MapContext} from '../../../map/model/map-context';


@Component({
    selector: 'app-map-ol-components-container',
    templateUrl: './map-ol-components-container.component.html',
    styleUrls: ['./map-ol-components-container.component.css']
})
export class MapOlComponentsContainerComponent implements OnInit, OnDestroy {
    private olMapFeatures: OlMapFeaturesContainer;
    private olFlightroute: OlFlightrouteContainer;
    private olNotams: OlNotamContainer;
    private olMetars: OlMetarContainer;
    private olTraffic: OlTrafficContainer;
    private olOwnPlane: OlOwnPlaneContainer;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
        this.olMapFeatures.destroy();
        this.olMetars.destroy();
        this.olNotams.destroy();
        this.olFlightroute.destroy();
        // TODO: destroy search result layer
        this.olTraffic.destroy();
        this.olOwnPlane.destroy();
    }


    public onMapInitCompleted(mapContext: MapContext) {
        this.addOlComponents(mapContext);
    }


    private addOlComponents(mapContext: MapContext) {
        this.olMapFeatures = new OlMapFeaturesContainer(mapContext);
        this.olMetars = new OlMetarContainer(mapContext);
        this.olNotams = new OlNotamContainer(mapContext);
        this.olFlightroute = new OlFlightrouteContainer(mapContext);
        // TODO: search results
        this.olTraffic = new OlTrafficContainer(mapContext);
        this.olOwnPlane = new OlOwnPlaneContainer(mapContext);
    }
}
