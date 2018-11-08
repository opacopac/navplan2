import * as ol from 'openlayers';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {Notam} from '../model/notam';
import {Polygon} from '../../shared/model/geometry/polygon';
import {Multipolygon} from '../../shared/model/geometry/multipolygon';
import {Circle} from '../../shared/model/geometry/circle';
import {Geometry2dType} from '../../shared/model/geometry/geometry2d';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';


export class OlNotam extends OlComponentBase {
    private readonly olFeature: ol.Feature;


    public constructor(
        notam: Notam,
        private readonly source: ol.source.Vector) {

        super();


        this.olFeature = this.createFeature(notam);
        this.olFeature.setStyle(this.createStyle(notam));
        this.setGeometry(this.olFeature, notam);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private setGeometry(feature: ol.Feature, notam: Notam) {
        if (!notam || ! notam.geometry || ! notam.geometry.geometry2d) {
            return;
        }

        switch (notam.geometry.geometry2d.getGeometryType()) {
            case Geometry2dType.POLYGON:
                this.setPolygonGeometry(feature, notam.geometry.geometry2d as Polygon);
                break;
            case Geometry2dType.MULTIPOLYGON:
                this.setMultiPolygonGeometry(feature, notam.geometry.geometry2d as Multipolygon);
                break;
            case Geometry2dType.CIRCLE:
                const circle = notam.geometry.geometry2d as Circle;

                // TODO: skip circles > 50nm
                if (circle.radius_m > UnitconversionService.nautmile2m(50)) {
                    return;
                }

                // create polygon from circle
                const polycirc = ol.geom.Polygon.circular(
                    new ol.Sphere(6378137),
                    circle.center.getLonLat(),
                    circle.radius_m);
                this.setPolygonGeometry(feature, Polygon.createFromLonLatList(polycirc.getCoordinates()[0]));
                break;
            default:
                return;
        }
    }


    protected createStyle(notam: Notam): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.15)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, 0.8)',
                width: 3
            }),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: notam.id,
                fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 1.0)'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
