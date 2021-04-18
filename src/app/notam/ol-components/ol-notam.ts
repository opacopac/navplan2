import {Feature} from 'ol';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {Notam} from '../domain-model/notam';
import {Polygon} from '../../geo-math/domain-model/geometry/polygon';
import {Multipolygon} from '../../geo-math/domain-model/geometry/multipolygon';
import {Circle} from '../../geo-math/domain-model/geometry/circle';
import {Geometry2dType} from '../../geo-math/domain-model/geometry/geometry2d';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {circular} from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';


export class OlNotam extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        notam: Notam,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(notam);
        this.olFeature.setStyle(this.createStyle(notam));
        this.setGeometry(this.olFeature, notam);
        layer.getSource().addFeature(this.olFeature);
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
                if (circle.radius.nm > 50) {
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
