import {Feature} from 'ol';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {Notam} from '../domain-model/notam';
import {Polygon} from '../../common/geo-math/domain-model/geometry/polygon';
import {Multipolygon} from '../../common/geo-math/domain-model/geometry/multipolygon';
import {Circle} from '../../common/geo-math/domain-model/geometry/circle';
import {Geometry2dType} from '../../common/geo-math/domain-model/geometry/geometry2d';
import {circular} from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlNotam {
    private readonly olFeature: Feature;


    public constructor(
        notam: Notam,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(notam, false);
        this.olFeature.setStyle(this.createStyle(notam));
        this.setGeometry(notam);
        layer.getSource().addFeature(this.olFeature);
    }


    private setGeometry(notam: Notam) {
        if (!notam || ! notam.geometry || ! notam.geometry.geometry2d) {
            return;
        }

        switch (notam.geometry.geometry2d.getGeometryType()) {
            case Geometry2dType.POLYGON:
                this.olFeature.setGeometry(OlHelper.getPolygonGeometry(notam.geometry.geometry2d as Polygon));
                break;
            case Geometry2dType.MULTIPOLYGON:
                this.olFeature.setGeometry(OlHelper.getMultiPolygonGeometry(notam.geometry.geometry2d as Multipolygon));
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
                const polyCircCoords = polycirc.getCoordinates()[0];
                this.olFeature.setGeometry(OlHelper.getPolygonGeometry(Polygon.createFromCoordList(polyCircCoords)));
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
