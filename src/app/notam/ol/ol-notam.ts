import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {Notam} from '../domain/notam';
import {Polygon} from '../../shared/model/geometry/polygon';
import {Multipolygon} from '../../shared/model/geometry/multipolygon';
import {Circle} from '../../shared/model/geometry/circle';
import {Geometry2dType} from '../../shared/model/geometry/geometry2d';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {circular} from 'ol/geom/Polygon';


export class OlNotam extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        notam: Notam,
        private readonly source: Vector) {

        super();


        this.olFeature = this.createFeature(notam);
        this.olFeature.setStyle(this.createStyle(notam));
        this.setGeometry(this.olFeature, notam);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private setGeometry(feature: Feature, notam: Notam) {
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
                if (circle.radius.m > UnitconversionService.nautmile2m(50)) {
                    return;
                }

                // create polygon from circle
                const polycirc = circular(
                    circle.center.toArray(),
                    circle.radius.m
                );
                this.setPolygonGeometry(feature, Polygon.createFromArray(polycirc.getCoordinates()[0]));
                break;
            default:
                return;
        }
    }


    protected createStyle(notam: Notam): Style {
        return new Style({
            fill: new Fill({
                color: 'rgba(255, 0, 0, 0.15)'}),
            stroke: new Stroke({
                color: 'rgba(255, 0, 0, 0.8)',
                width: 3
            }),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: notam.idnotam,
                fill: new Fill({color: 'rgba(255, 0, 0, 1.0)'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
