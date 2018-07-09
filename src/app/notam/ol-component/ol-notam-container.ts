import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {ArrayService} from '../../shared/services/array/array.service';
import {OlNotam} from './ol-notam';
import {getNotamList} from '../notam.selectors';
import {NotamList} from '../model/notam';


export class OlNotamContainer extends OlComponent {
    private readonly notamListSubscription: Subscription;
    private readonly olNotams: OlNotam[] = [];


    constructor(mapContext: MapContext) {
        super();

        const source = mapContext.mapService.notamLayer.getSource();
        const notamList$ = mapContext.appStore.select(getNotamList);
        this.notamListSubscription = notamList$.subscribe((notamList) => {
            this.addFeatures(notamList, source);
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
        this.destroyFeatures();
        if (notamList) {
            if (notamList.items) {
                notamList.items.forEach(notam => this.olNotams.push(new OlNotam(notam, source)));
            }
        }
    }


    private destroyFeatures() {
        this.olNotams.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlNotam>(this.olNotams);
    }
}
