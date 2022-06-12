import {combineLatest, Observable, Subscription} from 'rxjs';
import {MetarTaf} from '../../domain/model/metar-taf';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {ShortAirport} from '../../../aerodrome/domain/model/short-airport';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlMetarSky} from './ol-metar-sky';
import {OlMetarWind} from './ol-metar-wind';


export class OlMetarContainer {
    private readonly metarTafSubscription: Subscription;


    constructor(
        private readonly metarTafLayer: OlVectorLayer,
        metarTafList$: Observable<MetarTaf[]>,
        airportList$: Observable<ShortAirport[]>,
        mapRotation: Angle
    ) {
        this.metarTafSubscription = combineLatest([
            metarTafList$,
            airportList$
        ]).subscribe(([metarTafList, airportList]) => {
            this.clearFeatures();
            this.drawFeatures(metarTafList, airportList, mapRotation);
        });
    }


    public destroy() {
        this.metarTafSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(metarTafList: MetarTaf[], airports: ShortAirport[], mapRotation: Angle) {
        if (metarTafList) {
            const adPosMao = this.createAdPosTable(airports);

            metarTafList.forEach(metarTaf => {
                const pos =  adPosMao[metarTaf.ad_icao];
                if (pos) {
                    OlMetarSky.draw(metarTaf, pos, this.metarTafLayer);
                    OlMetarWind.draw(metarTaf, pos, mapRotation, this.metarTafLayer);
                }
            });
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
        this.metarTafLayer.clear();
    }
}
