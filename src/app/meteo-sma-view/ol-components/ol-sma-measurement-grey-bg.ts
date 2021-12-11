import {Fill, Style} from 'ol/style';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {Polygon} from '../../geo-physics/domain-model/geometry/polygon';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';


export class OlSmaMeasurementGreyBg {
    public static draw(layer: OlVectorLayer) {
        const olFeature = new OlFeature(undefined, false);
        olFeature.setStyle(this.createPolygonStyle());
        olFeature.setGeometry(OlGeometry.fromPolygon(this.createBgPolygon()));
        layer.addFeature(olFeature);
    }


    private static createPolygonStyle(): Style {
        return new Style({
            fill: new Fill({ color: 'rgba(0, 0, 0, 0.5)' })
        });
    }


    private static createBgPolygon(): Polygon {
        return new Polygon([
            new Position2d(-180, -85),
            new Position2d(180, -85),
            new Position2d(180, 85),
            new Position2d(-180, 85),
            new Position2d(-180, -85),
        ]);
    }
}
