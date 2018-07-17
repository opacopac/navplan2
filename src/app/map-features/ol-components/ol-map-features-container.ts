import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Mapfeatures} from '../model/mapfeatures';
import {getMapFeatures} from '../map-features.selectors';
import {Subscription} from 'rxjs';
import {OlNavaid} from './ol-navaid';
import {OlAirport} from './ol-airport';
import {OlReportingPoint} from './ol-reporting-point';
import {OlUserPoint} from './ol-user-point';
import {OlWebcam} from './ol-webcam';
import {OlReportingSector} from './ol-reporting-sector';
import {OlAirspace} from './ol-airspace';


export class OlMapFeaturesContainer extends OlComponent {
    private readonly mapFeaturesSubscription: Subscription;
    private readonly airspaceLayer: ol.layer.Vector;
    private readonly reportingSectorLayer: ol.layer.Vector;
    private readonly webcamLayer: ol.layer.Vector;
    private readonly userPointLayer: ol.layer.Vector;
    private readonly reportingPointLayer: ol.layer.Vector;
    private readonly navaidLayer: ol.layer.Vector;
    private readonly airportLayer: ol.layer.Vector;
    private olAirports: OlAirport[] = [];
    private olNavaids: OlNavaid[] = [];
    private olReportingPoints: OlReportingPoint[] = [];
    private olUserPoints: OlUserPoint[] = [];
    private olWebCams: OlWebcam[] = [];
    private olReportingSectors: OlReportingSector[] = [];
    private olAirspaces: OlAirspace[] = [];


    constructor(mapContext: MapContext) {
        super();

        this.airspaceLayer = mapContext.mapService.addVectorLayer(true, false);
        this.reportingSectorLayer = mapContext.mapService.addVectorLayer(true, false);
        this.webcamLayer = mapContext.mapService.addVectorLayer(false, false);
        this.userPointLayer = mapContext.mapService.addVectorLayer(false, true);
        this.reportingPointLayer = mapContext.mapService.addVectorLayer(false, true);
        this.navaidLayer = mapContext.mapService.addVectorLayer(false, true);
        this.airportLayer = mapContext.mapService.addVectorLayer(false, true);
        const mapFeatures$ = mapContext.appStore.select(getMapFeatures);
        this.mapFeaturesSubscription = mapFeatures$.subscribe((mapFeatures) => {
            this.destroyFeatures();
            this.addFeatures(mapFeatures);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.mapFeaturesSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(mapFeatures: Mapfeatures) {
        if (mapFeatures) {
            if (mapFeatures.airspaces) {
                mapFeatures.airspaces.forEach(airspace => this.olAirspaces.push(new OlAirspace(airspace, this.airspaceLayer.getSource())));
            }
            if (mapFeatures.reportingsectors) {
                mapFeatures.reportingsectors.forEach(repSec => this.olReportingSectors.push(new OlReportingSector(repSec, this.reportingSectorLayer.getSource())));
            }
            if (mapFeatures.webcams) {
                mapFeatures.webcams.forEach(webcam => this.olWebCams.push(new OlWebcam(webcam, this.webcamLayer.getSource())));
            }
            if (mapFeatures.userpoints) {
                mapFeatures.userpoints.forEach(userpoint => this.olUserPoints.push(new OlUserPoint(userpoint, this.userPointLayer.getSource())));
            }
            if (mapFeatures.reportingpoints) {
                mapFeatures.reportingpoints.forEach(repPoint => this.olReportingPoints.push(new OlReportingPoint(repPoint, this.reportingPointLayer.getSource())));
            }
            if (mapFeatures.navaids) {
                mapFeatures.navaids.forEach(navaid => this.olNavaids.push(new OlNavaid(navaid, this.navaidLayer.getSource())));
            }
            if (mapFeatures.airports) {
                mapFeatures.airports.forEach(airport => this.olAirports.push(new OlAirport(airport, this.airportLayer.getSource())));
            }
        }
    }


    private destroyFeatures() {
        this.olAirspaces = [];
        this.olReportingSectors = [];
        this.olWebCams = [];
        this.olUserPoints = [];
        this.olReportingPoints = [];
        this.olNavaids = [];
        this.olAirports = [];

        this.airspaceLayer.getSource().clear(true);
        this.reportingSectorLayer.getSource().clear(true);
        this.webcamLayer.getSource().clear(true);
        this.reportingPointLayer.getSource().clear(true);
        this.navaidLayer.getSource().clear(true);
        this.airportLayer.getSource().clear(true);
    }
}
