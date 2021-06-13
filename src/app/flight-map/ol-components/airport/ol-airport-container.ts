import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {OlAirport} from './ol-airport';


export class OlAirportContainer {
    private readonly airportsSubscription: Subscription;


    constructor(
        private readonly airportLayer: VectorLayer,
        airports$: Observable<ShortAirport[]>
    ) {
        this.airportsSubscription = airports$.subscribe((airports) => {
            this.clearFeatures();
            this.addFeatures(airports);
        });
    }


    public destroy() {
        this.airportsSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(airports: ShortAirport[]) {
        if (airports) {
            airports.forEach(airport => new OlAirport(airport, this.airportLayer));
        }
    }


    private clearFeatures() {
        this.airportLayer.getSource().clear(true);
    }
}
