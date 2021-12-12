import {Fill, Stroke, Style, Text} from 'ol/style';
import {Notam} from '../../notam/domain-model/notam';
import {Polygon} from '../../geo-physics/domain-model/geometry/polygon';
import {Multipolygon} from '../../geo-physics/domain-model/geometry/multipolygon';
import {Circle} from '../../geo-physics/domain-model/geometry/circle';
import {Geometry2dType} from '../../geo-physics/domain-model/geometry/geometry2d';
import {circular} from 'ol/geom/Polygon';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../base-map-view/ol-model/ol-geometry';


export class OlNotam {
    public static draw(
        notam: Notam,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(notam, false);
        olFeature.setStyle(this.createStyle(notam));
        this.setGeometry(notam, olFeature);
        layer.addFeature(olFeature);
    }


    private static setGeometry(notam: Notam, olFeature: OlFeature) {
        if (!notam || ! notam.geometry || ! notam.geometry.geometry2d) {
            return;
        }

        switch (notam.geometry.geometry2d.getGeometryType()) {
            case Geometry2dType.POLYGON:
                olFeature.setGeometry(OlGeometry.fromPolygon(notam.geometry.geometry2d as Polygon));
                break;
            case Geometry2dType.MULTIPOLYGON:
                olFeature.setGeometry(OlGeometry.fromMultiPolygon(notam.geometry.geometry2d as Multipolygon));
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
                olFeature.setGeometry(OlGeometry.fromPolygon(Polygon.createFromCoordList(polyCircCoords)));
                break;
            default:
                return;
        }
    }


    private static createStyle(notam: Notam): Style {
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
