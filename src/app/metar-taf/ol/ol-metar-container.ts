import {Vector} from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import {combineLatest, Subscription} from 'rxjs';
import {OlMapContext} from '../../ol-map/domain/ol-map-context';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {OlMetar} from './ol-metar';
import {getMetarTafList} from '../metar-taf.selectors';
import {MetarTafList} from '../domain/metar-taf';
import {getOpenAipAirports} from '../../open-aip/ngrx/open-aip.selectors';
import {Airport} from '../../open-aip/domain/airport';
import {Angle} from '../../shared/model/quantities/angle';
import {select} from '@ngrx/store';


export class OlMetarContainer extends OlComponentBase {
    private readonly metarTafSubscription: Subscription;
    private readonly metarTafLayer: VectorLayer;
    private olMetars: OlMetar[] = [];


    constructor(mapContext: OlMapContext) {
        super();

        this.metarTafLayer = mapContext.mapService.addVectorLayer(false);
        const metarTafList$ = mapContext.appStore.pipe(select(getMetarTafList));
        const airportList$ = mapContext.appStore.pipe(select(getOpenAipAirports));
        this.metarTafSubscription = combineLatest(
            metarTafList$,
            airportList$
        )
            .subscribe(([metarTafList, airportList]) => {
                this.destroyFeatures();
                this.addFeatures(metarTafList, airportList, this.metarTafLayer.getSource(), mapContext.mapService.getRotation());
            });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.metarTafSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(metarTafList: MetarTafList, airports: Airport[], source: Vector, mapRotation: Angle) {
        if (metarTafList) {
            const adPosMao = this.createAdPosTable(airports);

            if (metarTafList.items) {
                metarTafList.items.forEach(metarTaf => this.olMetars.push(
                    new OlMetar(metarTaf, adPosMao[metarTaf.ad_icao], mapRotation, source))
                );
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


    private destroyFeatures() {
        this.olMetars = [];
        this.metarTafLayer.getSource().clear(true);
    }
}
