import {Observable, Subscription} from 'rxjs';
import {Navaid} from '../../../enroute/domain-model/navaid';
import {OlNavaid} from './ol-navaid';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';


export class OlNavaidContainer {
    private readonly navaidSubscription: Subscription;


    constructor(
        private readonly navaidLLayer: OlVectorLayer,
        navaids$: Observable<Navaid[]>
    ) {
        this.navaidSubscription = navaids$.subscribe((navaids) => {
            this.clearFeatures();
            this.drawFeatures(navaids);
        });
    }


    public destroy() {
        this.navaidSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(navaids: Navaid[]) {
        if (navaids) {
            navaids.forEach(navaid => OlNavaid.draw(navaid, this.navaidLLayer));
        }
    }


    private clearFeatures() {
        this.navaidLLayer.clear();
    }
}
