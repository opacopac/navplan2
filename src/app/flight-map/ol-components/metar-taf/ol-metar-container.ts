import {combineLatest, Observable, Subscription} from 'rxjs';
import {OlMetar} from './ol-metar';
import {MetarTaf} from '../../../metar-taf/domain-model/metar-taf';
import {Angle} from '../../../common/geo-math/domain-model/quantities/angle';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';


export class OlMetarContainer {
    private readonly metarTafSubscription: Subscription;


    constructor(
        private readonly metarTafLayer: VectorLayer,
        metarTafList$: Observable<MetarTaf[]>,
        airportList$: Observable<ShortAirport[]>,
        mapRotation: Angle
    ) {
        this.metarTafSubscription = combineLatest([
            metarTafList$,
            airportList$
        ]).subscribe(([metarTafList, airportList]) => {
            this.clearFeatures();
            this.addFeatures(metarTafList, airportList, mapRotation);
        });
    }


    public destroy() {
        this.metarTafSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(metarTafList: MetarTaf[], airports: ShortAirport[], mapRotation: Angle) {
        if (metarTafList) {
            const adPosMao = this.createAdPosTable(airports);

            metarTafList.forEach(metarTaf => new OlMetar(metarTaf, adPosMao[metarTaf.ad_icao], mapRotation, this.metarTafLayer));
        }
    }


    private createAdPosTable(airports: ShortAirport[]): object {
        const adPosTable = {};

        if (airports) {
            airports.forEach((airport) => {
                if (airport.icao) {
                    adPosTable[airport.icao] = airport.position;
                }
            });
        }

        return adPosTable;
    }


    private clearFeatures() {
        this.metarTafLayer.getSource().clear(true);
    }
}
