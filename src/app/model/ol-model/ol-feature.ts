import * as ol from 'openlayers';
import { Position2d } from '../position';
import { Polygon } from '../polygon';
import { DataItem } from '../data-item';


export abstract class OlFeature extends ol.Feature {
    protected dataItem: DataItem;


    constructor(dataItem: DataItem) {
        super();
        this.dataItem = dataItem;
    }


    public getDataItem(): DataItem {
        return this.dataItem;
    }


    public setDataItem(dataItem: DataItem) {
        this.dataItem = dataItem;
    }


    public abstract draw(source: ol.source.Vector): void;
}


export abstract class OlFeaturePoint extends OlFeature {
    public draw(source: ol.source.Vector): void {
        const position: Position2d = this.getPosition();
        if (!position) {
            return;
        }

        this.setGeometry(new ol.geom.Point(position.getMercator()));

        const style = this.createPointStyle();
        if (style) {
            this.setStyle(style);
            source.addFeature(this);
        }
    }


    protected abstract getPosition(): Position2d;


    protected abstract createPointStyle(): ol.style.Style;
}


export abstract class OlFeaturePolygon extends OlFeature {
    public draw(source: ol.source.Vector): void {
        const polygon: Polygon = this.getPolygon();
        if (!polygon) {
            return;
        }

        this.setGeometry(new ol.geom.Polygon([polygon.getMercatorList()]));

        const style = this.createPolygonStyle();
        if (style) {
            this.setStyle(style);
            source.addFeature(this);
        }
    }


    protected abstract getPolygon(): Polygon;


    protected abstract createPolygonStyle(): ol.style.Style;
}
