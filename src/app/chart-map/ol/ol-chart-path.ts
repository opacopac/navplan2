import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Stroke, Style} from 'ol/style';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {ChartPath} from '../domain/chart-path';


export class OlChartPath extends OlComponentBase {
    private lineFeature: Feature;


    public constructor(
        private readonly path: ChartPath,
        private readonly source: Vector
    ) {
        super();
    }


    public draw(): void {
        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, this.path.getPathPoints());
        this.source.addFeature(this.lineFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#FF00FF',
                width: 3
            })
        });
    }
}
