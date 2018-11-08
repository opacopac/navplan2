import * as ol from 'openlayers';
import {combineLatest, Subscription} from 'rxjs';
import {BaseMapContext} from '../../base-map/model/base-map-context';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {OlMetar} from './ol-metar';
import {getMetarTafList} from '../metar-taf.selectors';
import {MetarTafList} from '../model/metar-taf';
import {getMapFeaturesAirports} from '../../map-features/map-features.selectors';
import {Airport} from '../../map-features/model/airport';
import {Angle} from '../../shared/model/quantities/angle';
import {select} from '@ngrx/store';


export class OlMetarContainer extends OlComponentBase {
    private readonly metarTafSubscription: Subscription;
    private readonly metarTafLayer: ol.layer.Vector;
    private olMetars: OlMetar[] = [];


    constructor(mapContext: BaseMapContext) {
        super();

        this.metarTafLayer = mapContext.mapService.addVectorLayer(false);
        const metarTafList$ = mapContext.appStore.pipe(select(getMetarTafList));
        const airportList$ = mapContext.appStore.pipe(select(getMapFeaturesAirports));
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


    private addFeatures(metarTafList: MetarTafList, airports: Airport[], source: ol.source.Vector, mapRotation: Angle) {
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
