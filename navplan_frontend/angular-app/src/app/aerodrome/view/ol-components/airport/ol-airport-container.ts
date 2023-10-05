import {Observable, Subscription} from 'rxjs';
import {ShortAirport} from '../../../domain/model/short-airport';
import {OlAirport} from './ol-airport';
import {OlVectorLayer} from '../../../../base-map/view/ol-model/ol-vector-layer';


export class OlAirportContainer {
    private readonly airportsSubscription: Subscription;


    constructor(
        private readonly airportLayer: OlVectorLayer,
        airports$: Observable<ShortAirport[]>
    ) {
        this.airportsSubscription = airports$.subscribe((airports) => {
            this.clearFeatures();
            this.drawFeatures(airports);
        });
    }


    public destroy() {
        this.airportsSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(airports: ShortAirport[]) {
        if (airports) {
            airports.forEach(airport => OlAirport.draw(airport, this.airportLayer));
        }
    }


    private clearFeatures() {
        this.airportLayer.clear();
    }
}
