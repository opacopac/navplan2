import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {OlMapContext} from '../../ol-map/domain/ol-map-context';
import {Subscription} from 'rxjs';
import {select} from '@ngrx/store';
import {getChartMapState} from '../ngrx/chart-map.selectors';
import {OlChartPath} from './ol-chart-path';


export class OlChartPathContainer extends OlComponentBase {
    private readonly chartPathSubscription: Subscription;
    private readonly chartPathLayer: VectorLayer;


    constructor(mapContext: OlMapContext) {
        super();

        this.chartPathLayer = mapContext.mapService.addVectorLayer(false);
        const chartMapState$ = mapContext.appStore.pipe(select(getChartMapState));
        this.chartPathSubscription = chartMapState$.subscribe((state) => {
            this.destroyFeatures();
            const olChartPath = new OlChartPath(state.chartPath, this.chartPathLayer.getSource());
            olChartPath.draw();
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.chartPathSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private destroyFeatures() {
        this.chartPathLayer.getSource().clear(true);
    }
}
