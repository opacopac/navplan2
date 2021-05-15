import {Observable, Subscription} from 'rxjs';
import {OlNotam} from './ol-notam';
import {NotamList} from '../domain-model/notam-list';
import VectorLayer from 'ol/layer/Vector';


export class OlNotamContainer {
    private readonly notamListSubscription: Subscription;


    constructor(
        private readonly notamLayer: VectorLayer,
        notamList$: Observable<NotamList>
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


    private addFeatures(notamList: NotamList) {
        if (notamList) {
            notamList.items.forEach(notam => new OlNotam(notam, this.notamLayer));
        }
    }


    private clearFeatures() {
        this.notamLayer.getSource().clear(true);
    }
}
