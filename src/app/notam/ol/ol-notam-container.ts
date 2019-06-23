import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {OlMapContext} from '../../ol-map/domain/ol-map-context';
import {Subscription} from 'rxjs';
import {OlNotam} from './ol-notam';
import {getNotamList} from '../ngrx/notam.selectors';
import {NotamList} from '../domain/notam-list';
import {select} from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';
import {Vector} from 'ol/source';


export class OlNotamContainer extends OlComponentBase {
    private readonly notamListSubscription: Subscription;
    private readonly notamLayer: VectorLayer;
    private olNotams: OlNotam[] = [];


    constructor(mapContext: OlMapContext) {
        super();

        this.notamLayer = mapContext.mapService.addVectorLayer(true);
        const notamList$ = mapContext.appStore.pipe(select(getNotamList));
        this.notamListSubscription = notamList$.subscribe((notamList) => {
            this.destroyFeatures();
            this.addFeatures(notamList, this.notamLayer.getSource());
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.notamListSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(notamList: NotamList, source: Vector) {
        if (notamList) {
            if (notamList.items) {
                notamList.items.forEach(notam => this.olNotams.push(new OlNotam(notam, source)));
            }
        }
    }


    private destroyFeatures() {
        this.olNotams = [];
        this.notamLayer.getSource().clear(true);
    }
}
