import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import {OlNotam} from './ol-notam';
import {NotamList} from '../domain-model/notam-list';
import VectorLayer from 'ol/layer/Vector';


export class OlNotamContainer extends OlComponentBase {
    private readonly notamListSubscription: Subscription;


    constructor(
        private readonly notamLayer: VectorLayer,
        notamList$: Observable<NotamList>
    ) {
        super();

        this.notamListSubscription = notamList$.subscribe(notamList => {
            this.clearFeatures();
            this.addFeatures(notamList);
        });
    }


    public get isSelectable(): boolean {
        return false;
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
