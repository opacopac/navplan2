import {Observable, Subscription} from 'rxjs';
import {OlNotam} from './ol-notam';
import {Notam} from '../../../notam/domain-model/notam';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';


export class OlNotamContainer {
    private readonly notamListSubscription: Subscription;


    constructor(
        private readonly notamLayer: OlVectorLayer,
        notamList$: Observable<Notam[]>
    ) {
        this.notamListSubscription = notamList$.subscribe(notamList => {
            this.clearFeatures();
            this.drawFeatures(notamList);
        });
    }


    public destroy() {
        this.notamListSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(notamList: Notam[]) {
        if (notamList) {
            notamList.forEach(notam => OlNotam.draw(notam, this.notamLayer));
        }
    }


    private clearFeatures() {
        this.notamLayer.clear();
    }
}
