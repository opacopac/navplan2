import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Observable} from 'rxjs/Observable';
import {Mapfeatures} from '../model/mapfeatures';
import {getMapFeatures} from '../map-features.selectors';
import {Navaid} from '../model/navaid';
import {Subscription} from 'rxjs/Subscription';
import {OlNavaid} from './ol-navaid';
import {Airport} from '../model/airport';
import {OlAirport} from './ol-airport';


export class OlMapFeaturesContainer extends OlComponent {
    private mapFeatures$: Observable<Mapfeatures>;
    private mapFeaturesSubscription: Subscription;
    private olAirports: OlAirport[];
    private olNavaids: OlNavaid[];


    constructor(mapContext: MapContext) {
        super(mapContext);

        this.mapFeatures$ = this.mapContext.appStore.select(getMapFeatures);
        this.mapFeaturesSubscription = this.mapFeatures$.subscribe((mapFeatures) => {
            if (mapFeatures) {
                this.addNavaids(mapFeatures.navaids);
            }
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.mapFeaturesSubscription.unsubscribe();
        this.destroyNavaids();
    }


    private addAirports(airports: Airport[]) {
    }


    private addNavaids(navaids: Navaid[]) {
        this.destroyNavaids();
        navaids.forEach(navaid => this.olNavaids.push(new OlNavaid(this.mapContext, navaid)));
    }


    private destroyNavaids() {
        if (this.olNavaids) {
            this.olNavaids.forEach(olNavaid => olNavaid.destroy());
        }
        this.olNavaids = [];
    }
}
