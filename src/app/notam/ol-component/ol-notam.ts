import * as ol from 'openlayers';
import { UnitconversionService } from '../../shared/services/unitconversion/unitconversion.service';
import { OlFeature } from '../../shared/model/ol-feature';
import { Notam } from '../model/notam';
import { Polygon } from '../../shared/model/geometry/polygon';
import { Multipolygon } from '../../shared/model/geometry/multipolygon';
import { Circle } from '../../shared/model/geometry/circle';
import { Geometry2dType } from '../../shared/model/geometry/geometry2d';


export class OlNotam extends OlFeature {
    public constructor(
        public notam: Notam) {

        super(notam);
    }


    public draw(source: ol.source.Vector) {
        if (!this.notam || ! this.notam.geometry || ! this.notam.geometry.geometry2d) {
            return;
        }

        switch (this.notam.geometry.geometry2d.getGeometryType()) {
            case Geometry2dType.POLYGON:
                this.setGeometry(new ol.geom.Polygon([(this.notam.geometry.geometry2d as Polygon).getMercatorList()]));
                break;
            case Geometry2dType.MULTIPOLYGON:
                this.setGeometry(new ol.geom.Polygon((this.notam.geometry.geometry2d as Multipolygon).getMercatorList()));
                break;
            case Geometry2dType.CIRCLE:
                const circle = this.notam.geometry.geometry2d as Circle;

                // TODO: skip circles > 50nm
                if (circle.radius_m > UnitconversionService.nautmile2m(50)) {
                    return;
                }

                // create polygon from circle
                const polycirc = ol.geom.Polygon.circular(
                    new ol.Sphere(6378137),
                    circle.center.getLonLat(),
                    circle.radius_m);
                this.setGeometry(new ol.geom.Polygon([Polygon.createFromLonLatList(polycirc.getCoordinates()[0]).getMercatorList()]));
                break;
            default:
                return;
        }


        const style = this.createStyle();
        if (style) {
            this.setStyle(style);
            source.addFeature(this);
        }
    }


    protected createStyle(): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.15)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, 0.8)',
                width: 3
            }),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: this.notam.id,
                fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 1.0)'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
