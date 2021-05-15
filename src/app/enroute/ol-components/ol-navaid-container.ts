import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {Navaid} from '../domain-model/navaid';
import {OlNavaid} from './ol-navaid';


export class OlNavaidContainer {
    private readonly navaidSubscription: Subscription;


    constructor(
        private readonly navaidLLayer: VectorLayer,
        navaids$: Observable<Navaid[]>
    ) {
        this.navaidSubscription = navaids$.subscribe((navaids) => {
            this.clearFeatures();
            this.addFeatures(navaids);
        });
    }


    public destroy() {
        this.navaidSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(navaids: Navaid[]) {
        if (navaids) {
            navaids.forEach(navaid => new OlNavaid(navaid, this.navaidLLayer));
        }
    }


    private clearFeatures() {
        this.navaidLLayer.getSource().clear(true);
    }
}
