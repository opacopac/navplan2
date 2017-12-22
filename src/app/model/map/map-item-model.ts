import * as ol from 'openlayers';
import { Position2d } from '../position';
import { Polygon } from '../polygon';


export enum MapItemGeometryType {
    POINT,
    POLYGON
}


export interface MapItemModel {
    getGeometryType(): MapItemGeometryType;
    getGeometry(): any;
}


export abstract class MapItemOlFeature<T extends MapItemModel> extends ol.Feature {
    public mapItemModel: T;


    public constructor(model: T) {
        super();
        this.mapItemModel = model;
    }


    public draw(source: ol.source.Vector) {
        switch (this.mapItemModel.getGeometryType()) {
            case MapItemGeometryType.POINT:
                const position: Position2d = this.mapItemModel.getGeometry();
                this.setGeometry(new ol.geom.Point(position.getMercator()));
                break;
            case MapItemGeometryType.POLYGON:
                const polygon: Polygon = this.mapItemModel.getGeometry();
                this.setGeometry(new ol.geom.Polygon([polygon.getMercatorList()]));
                break;
            default:
                return;
        }

        const style = this.createOlStyle();

        if (style) {
            this.setStyle(style);
            source.addFeature(this);
        }
    }


    protected abstract createOlStyle(): ol.style.Style;
}
