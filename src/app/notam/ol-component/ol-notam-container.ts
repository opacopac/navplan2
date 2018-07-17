import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {OlNotam} from './ol-notam';
import {getNotamList} from '../notam.selectors';
import {NotamList} from '../model/notam';


export class OlNotamContainer extends OlComponent {
    private readonly notamListSubscription: Subscription;
    private readonly notamLayer: ol.layer.Vector;
    private olNotams: OlNotam[] = [];


    constructor(mapContext: MapContext) {
        super();

        this.notamLayer = mapContext.mapService.addVectorLayer(true, false);
        const notamList$ = mapContext.appStore.select(getNotamList);
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


    private addFeatures(notamList: NotamList, source: ol.source.Vector) {
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
