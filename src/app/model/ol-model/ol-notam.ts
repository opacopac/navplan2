import * as ol from 'openlayers';
import { UnitconversionService } from '../../services/utils/unitconversion.service';
import { OlFeaturePolygon } from './ol-feature';
import { Notam } from '../notam';
import { Polygon } from '../polygon';
import { Circle } from '../circle';
import { Geometry2dType } from '../geometry2d';


export class OlNotam extends OlFeaturePolygon {
    public constructor(
        public notam: Notam) {

        super(notam);
    }


    protected getPolygon(): Polygon {
        if (!this.notam.geometry) {
            return undefined;
        }

        if (this.notam.geometry.geometry2d.getGeometryType() === Geometry2dType.POLYGON) {
            return this.notam.geometry.geometry2d as Polygon;
        } else if (this.notam.geometry.geometry2d.getGeometryType() === Geometry2dType.CIRCLE) {
            const circle = this.notam.geometry.geometry2d as Circle;

            // TODO
            if (circle.radius_m > UnitconversionService.nautmile2m(50)) {
                return undefined;
            }

            const polycirc = ol.geom.Polygon.circular(
                new ol.Sphere(6378137),
                circle.center.getLonLat(),
                circle.radius_m);

            return Polygon.createFromLonLatList(polycirc.getCoordinates()[0]);
        } else {
            return undefined;
        }
    }


    protected createPolygonStyle(): ol.style.Style {
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
