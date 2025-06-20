import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlCrosshairIcon} from './ol-crosshair-icon';
import {CrosshairIcon} from '../../domain/model/crosshair-icon';


export class OlCrosshairContainer {
    private readonly iconSubscription: Subscription;


    constructor(
        private readonly iconLayer: OlVectorLayer,
        icons$: Observable<CrosshairIcon[]>
    ) {
        this.iconSubscription = icons$.subscribe((icon) => {
            this.clearFeatures();
            this.drawFeatures(icon);
        });
    }


    public destroy() {
        this.iconSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(icons: CrosshairIcon[]) {
        if (icons) {
            icons.forEach(icon => {
                OlCrosshairIcon.draw(icon, this.iconLayer);
            });
        }
    }


    private clearFeatures() {
        this.iconLayer.clear();
    }
}
