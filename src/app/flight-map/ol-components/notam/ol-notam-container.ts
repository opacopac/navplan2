import {Observable, Subscription} from 'rxjs';
import {OlNotam} from './ol-notam';
import VectorLayer from 'ol/layer/Vector';
import {Notam} from '../../../notam/domain-model/notam';


export class OlNotamContainer {
    private readonly notamListSubscription: Subscription;


    constructor(
        private readonly notamLayer: VectorLayer,
        notamList$: Observable<Notam[]>
    ) {
        this.notamListSubscription = notamList$.subscribe(notamList => {
            this.clearFeatures();
            this.addFeatures(notamList);
        });
    }


    public destroy() {
        this.notamListSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(notamList: Notam[]) {
        if (notamList) {
            notamList.forEach(notam => new OlNotam(notam, this.notamLayer));
        }
    }


    private clearFeatures() {
        this.notamLayer.getSource().clear(true);
    }
}
