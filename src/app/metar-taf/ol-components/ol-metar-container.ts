import {combineLatest, Observable, Subscription} from 'rxjs';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OlMetar} from './ol-metar';
import {MetarTafList} from '../domain-model/metar-taf';
import {Airport} from '../../open-aip/domain-model/airport';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import VectorLayer from 'ol/layer/Vector';


export class OlMetarContainer extends OlComponentBase {
    private readonly metarTafSubscription: Subscription;


    constructor(
        private readonly metarTafLayer: VectorLayer,
        metarTafList$: Observable<MetarTafList>,
        airportList$: Observable<Airport[]>,
        mapRotation: Angle
    ) {
        super();

        this.metarTafSubscription = combineLatest([
            metarTafList$,
            airportList$
        ])
            .subscribe(([metarTafList, airportList]) => {
                this.clearFeatures();
                this.addFeatures(metarTafList, airportList, mapRotation);
            });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.metarTafSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(metarTafList: MetarTafList, airports: Airport[], mapRotation: Angle) {
        if (metarTafList) {
            const adPosMao = this.createAdPosTable(airports);

            if (metarTafList.items) {
                metarTafList.items.forEach(metarTaf => new OlMetar(metarTaf, adPosMao[metarTaf.ad_icao], mapRotation, this.metarTafLayer));
            }
        }
    }


    private createAdPosTable(airports: Airport[]): object {
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
