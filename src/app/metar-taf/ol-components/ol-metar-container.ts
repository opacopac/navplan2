import * as ol from 'openlayers';
import {combineLatest, Subscription} from 'rxjs';
import {MapContext} from '../../map/model/map-context';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {OlMetar} from './ol-metar';
import {getMetarTafList} from '../metar-taf.selectors';
import {MetarTafList} from '../model/metar-taf';
import {getMapFeaturesAirports} from '../../map-features/map-features.selectors';
import {Airport} from '../../map-features/model/airport';
import {Angle} from '../../shared/model/quantities/angle';


export class OlMetarContainer extends OlComponent {
    private readonly metarTafSubscription: Subscription;
    private readonly metarTafLayer: ol.layer.Vector;
    private olMetars: OlMetar[] = [];


    constructor(mapContext: MapContext) {
        super();

        this.metarTafLayer = mapContext.mapService.addVectorLayer(false, false);
        const metarTafList$ = mapContext.appStore.select(getMetarTafList);
        const airportList$ = mapContext.appStore.select(getMapFeaturesAirports);
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
