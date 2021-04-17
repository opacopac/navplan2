import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {BaseMapContext} from '../../base-map/domain-model/base-map-context';
import {OpenAipItems} from '../domain-model/open-aip-items';
import {getOpenAipItems} from '../ngrx/open-aip.selectors';
import {Subscription} from 'rxjs';
import {OlNavaid} from './ol-navaid';
import {OlAirport} from './ol-airport';
import {OlReportingPoint} from './ol-reporting-point';
import {OlUserPoint} from './ol-user-point';
import {OlWebcam} from './ol-webcam';
import {OlReportingSector} from './ol-reporting-sector';
import {OlAirspace} from './ol-airspace';
import {select} from '@ngrx/store';


export class OlOpenAipItemsContainer extends OlComponentBase {
    private readonly openAipItemsSubscription: Subscription;
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
        const openAipItems$ = mapContext.appStore.pipe(select(getOpenAipItems));
        this.openAipItemsSubscription = openAipItems$.subscribe((openAipItems) => {
            this.destroyFeatures();
            this.addFeatures(openAipItems);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.openAipItemsSubscription.unsubscribe();
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


    private addFeatures(openAipItems: OpenAipItems) {
        if (openAipItems) {
            if (openAipItems.airspaces) {
                openAipItems.airspaces.forEach(airspace => this.olAirspaces.push(new OlAirspace(airspace, this.airspaceLayer.getSource())));
            }
            if (openAipItems.reportingsectors) {
                openAipItems.reportingsectors.forEach(repSec => this.olReportingSectors.push(new OlReportingSector(repSec, this.reportingSectorLayer.getSource())));
            }
            if (openAipItems.webcams) {
                openAipItems.webcams.forEach(webcam => this.olWebCams.push(new OlWebcam(webcam, this.webcamLayer.getSource())));
            }
            if (openAipItems.userpoints) {
                openAipItems.userpoints.forEach(userpoint => this.olUserPoints.push(new OlUserPoint(userpoint, this.userPointLayer.getSource())));
            }
            if (openAipItems.reportingpoints) {
                openAipItems.reportingpoints.forEach(repPoint => this.olReportingPoints.push(new OlReportingPoint(repPoint, this.reportingPointLayer.getSource())));
            }
            if (openAipItems.navaids) {
                openAipItems.navaids.forEach(navaid => this.olNavaids.push(new OlNavaid(navaid, this.navaidLayer.getSource())));
            }
            if (openAipItems.airports) {
                openAipItems.airports.forEach(airport => this.olAirports.push(new OlAirport(airport, this.airportLayer.getSource())));
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
