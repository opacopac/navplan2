import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlOwnPlaneContainer} from '../../../location/ol/ol-own-plane-container';
import {OlFlightrouteContainer} from '../../../flightroute/ol/ol-flightroute-container';
import {OlMetarContainer} from '../../../metar-taf/ol/ol-metar-container';
import {OlTrafficContainer} from '../../../traffic/ol/ol-traffic-container';
import {OlMapFeaturesContainer} from '../../../map-features/ol/ol-map-features-container';
import {OlNotamContainer} from '../../../notam/ol/ol-notam-container';
import {OlMapContext} from '../../../ol-map/domain/ol-map-context';
import {OlTrackContainer} from '../../../track/ol/ol-track-container';


@Component({
    selector: 'app-ol-components-container',
    templateUrl: './ol-components-container.component.html',
    styleUrls: ['./ol-components-container.component.css']
})
export class OlComponentsContainerComponent implements OnInit, OnDestroy {
    private olMapFeatures: OlMapFeaturesContainer;
    private olFlightroute: OlFlightrouteContainer;
    private olTrack: OlTrackContainer;
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
        this.olTrack.destroy();
        this.olFlightroute.destroy();
        // TODO: destroy search result layer
        this.olTraffic.destroy();
        this.olOwnPlane.destroy();
    }


    public onMapInitCompleted(mapContext: OlMapContext) {
        this.addOlComponents(mapContext);
    }


    private addOlComponents(mapContext: OlMapContext) {
        this.olMapFeatures = new OlMapFeaturesContainer(mapContext);
        this.olMetars = new OlMetarContainer(mapContext);
        this.olNotams = new OlNotamContainer(mapContext);
        this.olTrack = new OlTrackContainer(mapContext);
        this.olFlightroute = new OlFlightrouteContainer(mapContext, this.olMapFeatures.getSnapToLayers());
        // TODO: search results
        this.olTraffic = new OlTrafficContainer(mapContext);
        this.olOwnPlane = new OlOwnPlaneContainer(mapContext);
    }
}
