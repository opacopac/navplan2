import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OpenAipItems} from '../domain-model/open-aip-items';
import {Observable, Subscription} from 'rxjs';
import {OlNavaid} from './ol-navaid';
import {OlAirport} from './ol-airport';
import {OlReportingPoint} from './ol-reporting-point';
import {OlUserPoint} from './ol-user-point';
import {OlWebcam} from './ol-webcam';
import {OlReportingSector} from './ol-reporting-sector';
import {OlAirspace} from './ol-airspace';
import VectorLayer from 'ol/layer/Vector';


export class OlOpenAipItemsContainer extends OlComponentBase {
    private readonly openAipItemsSubscription: Subscription;


    constructor(
        private readonly airspaceLayer: VectorLayer,
        private readonly reportingSectorLayer: VectorLayer,
        private readonly webcamLayer: VectorLayer,
        private readonly userPointLayer: VectorLayer,
        private readonly reportingPointLayer: VectorLayer,
        private readonly navaidLayer: VectorLayer,
        private readonly airportLayer: VectorLayer,
        openAipItems$: Observable<OpenAipItems>
    ) {
        super();

        this.openAipItemsSubscription = openAipItems$.subscribe((openAipItems) => {
            this.clearFeatures();
            this.addFeatures(openAipItems);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.openAipItemsSubscription.unsubscribe();
        this.clearFeatures();
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
            openAipItems.airspaces.forEach(airspace => new OlAirspace(airspace, this.airspaceLayer));
            openAipItems.reportingsectors.forEach(repSec => new OlReportingSector(repSec), this.reportingSectorLayer);
            openAipItems.webcams.forEach(webcam => new OlWebcam(webcam, this.webcamLayer));
            openAipItems.userpoints.forEach(userpoint => new OlUserPoint(userpoint, this.userPointLayer));
            openAipItems.reportingpoints.forEach(repPoint => new OlReportingPoint(repPoint, this.reportingPointLayer));
            openAipItems.navaids.forEach(navaid => new OlNavaid(navaid, this.navaidLayer));
            openAipItems.airports.forEach(airport => new OlAirport(airport, this.airportLayer));
        }
    }


    private clearFeatures() {
        this.airspaceLayer.getSource().clear(true);
        this.reportingSectorLayer.getSource().clear(true);
        this.webcamLayer.getSource().clear(true);
        this.reportingPointLayer.getSource().clear(true);
        this.navaidLayer.getSource().clear(true);
        this.airportLayer.getSource().clear(true);
    }
}
