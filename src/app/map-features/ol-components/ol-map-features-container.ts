import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Observable} from 'rxjs/Observable';
import {Mapfeatures} from '../model/mapfeatures';
import {getMapFeatures} from '../map-features.selectors';
import {Subscription} from 'rxjs/Subscription';
import {OlNavaid} from './ol-navaid';
import {OlAirport} from './ol-airport';
import {OlReportingPoint} from './ol-reporting-point';
import {OlUserPoint} from './ol-user-point';
import {OlWebcam} from './ol-webcam';
import {ArrayService} from '../../shared/services/array/array.service';
import {OlReportingSector} from './ol-reporting-sector';
import {OlAirspace} from './ol-airspace';


export class OlMapFeaturesContainer extends OlComponent {
    private readonly mapFeatures$: Observable<Mapfeatures>;
    private readonly mapFeaturesSubscription: Subscription;
    private readonly olAirports: OlAirport[] = [];
    private readonly olNavaids: OlNavaid[] = [];
    private readonly olReportingPoints: OlReportingPoint[] = [];
    private readonly olUserPoints: OlUserPoint[] = [];
    private readonly olWebCams: OlWebcam[] = [];
    private readonly olReportingSectors: OlReportingSector[] = [];
    private readonly olAirspaces: OlAirspace[] = [];


    constructor(mapContext: MapContext) {
        super();

        const routeItemsSource = mapContext.mapService.routeItemsLayer.getSource();
        const nonRouteItemsSource = mapContext.mapService.nonrouteItemsLayer.getSource();
        this.mapFeatures$ = mapContext.appStore.select(getMapFeatures);
        this.mapFeaturesSubscription = this.mapFeatures$.subscribe((mapFeatures) => {
            this.addFeatures(mapFeatures, routeItemsSource, nonRouteItemsSource);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.mapFeaturesSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(mapFeatures: Mapfeatures, routeItemsSource: ol.source.Vector, nonRouteItemsSource: ol.source.Vector) {
        this.destroyFeatures();
        if (mapFeatures) {
            if (mapFeatures.airspaces) {
                mapFeatures.airspaces.forEach(airspace => this.olAirspaces.push(new OlAirspace(airspace, nonRouteItemsSource)));
            }
            if (mapFeatures.reportingsectors) {
                mapFeatures.reportingsectors.forEach(repSec => this.olReportingSectors.push(new OlReportingSector(repSec, routeItemsSource)));
            }
            if (mapFeatures.webcams) {
                mapFeatures.webcams.forEach(webcam => this.olWebCams.push(new OlWebcam(webcam, nonRouteItemsSource)));
            }
            if (mapFeatures.userpoints) {
                mapFeatures.userpoints.forEach(userpoint => this.olUserPoints.push(new OlUserPoint(userpoint, routeItemsSource)));
            }
            if (mapFeatures.reportingpoints) {
                mapFeatures.reportingpoints.forEach(repPoint => this.olReportingPoints.push(new OlReportingPoint(repPoint, routeItemsSource)));
            }
            if (mapFeatures.navaids) {
                mapFeatures.navaids.forEach(navaid => this.olNavaids.push(new OlNavaid(navaid, routeItemsSource)));
            }
            if (mapFeatures.airports) {
                mapFeatures.airports.forEach(airport => this.olAirports.push(new OlAirport(airport, routeItemsSource)));
            }
        }
    }


    private destroyFeatures() {
        this.olAirports.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlAirport>(this.olAirports);

        this.olNavaids.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlNavaid>(this.olNavaids);

        this.olReportingPoints.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlReportingPoint>(this.olReportingPoints);

        this.olUserPoints.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlUserPoint>(this.olUserPoints);

        this.olWebCams.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlWebcam>(this.olWebCams);

        this.olReportingSectors.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlReportingSector>(this.olReportingSectors);

        this.olAirspaces.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlAirspace>(this.olAirspaces);
    }
}
