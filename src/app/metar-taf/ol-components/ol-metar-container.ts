import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {ArrayService} from '../../shared/services/array/array.service';
import {combineLatest, Subscription} from 'rxjs';
import {MapContext} from '../../map/model/map-context';
import {OlMetar} from './ol-metar';
import {getMetarTafList} from '../metar-taf.selectors';
import {MetarTafList} from '../model/metar-taf';
import {getMapFeaturesAirports} from '../../map-features/map-features.selectors';
import {Airport} from '../../map-features/model/airport';
import {Angle} from '../../shared/model/quantities/angle';


export class OlMetarContainer extends OlComponent {
    private readonly metarTafSubscription: Subscription;
    private readonly olMetars: OlMetar[] = [];


    constructor(mapContext: MapContext) {
        super();

        const source = mapContext.mapService.nonrouteItemsLayer.getSource();
        const metarTafList$ = mapContext.appStore.select(getMetarTafList);
        const airportList$ = mapContext.appStore.select(getMapFeaturesAirports);
        this.metarTafSubscription = combineLatest(
            metarTafList$,
            airportList$
        )
            .subscribe(([metarTafList, airportList]) => {
                this.addFeatures(metarTafList, airportList, source, mapContext.mapService.getRotation());
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
        this.destroyFeatures();
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
        if (this.olMetars) {
            this.olMetars.forEach(olComponent => olComponent.destroy());
            ArrayService.clear<OlMetar>(this.olMetars);
        }
    }
}
