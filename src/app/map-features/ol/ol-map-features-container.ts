import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {BaseMapContext} from '../../base-map/domain/base-map-context';
import {OpenAipItems} from '../domain/open-aip-items';
import {getMapFeatures} from '../map-features.selectors';
import {Subscription} from 'rxjs';
import {OlNavaid} from './ol-navaid';
import {OlAirport} from './ol-airport';
import {OlReportingPoint} from './ol-reporting-point';
import {OlUserPoint} from './ol-user-point';
import {OlWebcam} from './ol-webcam';
import {OlReportingSector} from './ol-reporting-sector';
import {OlAirspace} from './ol-airspace';
import {select} from '@ngrx/store';


export class OlMapFeaturesContainer extends OlComponentBase {
    private readonly mapFeaturesSubscription: Subscription;
    private readonly airspaceLayer: VectorLayer;
    private readonly reportingSectorLayer: VectorLayer;
    private readonly webcamLayer: VectorLayer;
    private readonly userPointLayer: VectorLayer;
    private readonly reportingPointLayer: VectorLayer;
    private readonly navaidLayer: VectorLayer;
    private readonly airportLayer: VectorLayer;
    private olAirports: OlAirport[] = [];
    private olNavaids: OlNavaid[] = [];
    private olReportingPoints: OlReportingPoint[] = [];
    private olUserPoints: OlUserPoint[] = [];
    private olWebCams: OlWebcam[] = [];
    private olReportingSectors: OlReportingSector[] = [];
    private olAirspaces: OlAirspace[] = [];


    constructor(mapContext: BaseMapContext) {
        super();

        this.airspaceLayer = mapContext.mapService.addVectorLayer(true);
        this.reportingSectorLayer = mapContext.mapService.addVectorLayer(true);
        this.webcamLayer = mapContext.mapService.addVectorLayer(false);
        this.userPointLayer = mapContext.mapService.addVectorLayer(false);
        this.reportingPointLayer = mapContext.mapService.addVectorLayer(false);
        this.navaidLayer = mapContext.mapService.addVectorLayer(false);
        this.airportLayer = mapContext.mapService.addVectorLayer(false);
        const mapFeatures$ = mapContext.appStore.pipe(select(getMapFeatures));
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


    public getSnapToLayers(): VectorLayer[] {
        return [
            this.userPointLayer,
            this.reportingPointLayer,
            this.navaidLayer,
            this.airportLayer
        ];
    }


    private addFeatures(mapFeatures: OpenAipItems) {
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
