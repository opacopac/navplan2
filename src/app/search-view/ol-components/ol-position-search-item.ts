import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {IPointSearchResult} from '../../search/domain-model/i-point-search-result';


const LABEL_DIST_PIXEL = 100;
const POINT_RADIUS_PIXEL = 5;


export class OlPositionSearchItem {
    public static draw(
        pointSearchResult: IPointSearchResult,
        labelRotAngle: Angle,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(pointSearchResult.getDataItem(), true);
        olFeature.setStyle(this.createPointStyle(pointSearchResult.getGeoselectionName(), labelRotAngle));
        olFeature.setGeometry(OlGeometry.fromPoint(pointSearchResult.getPosition()));

        const olLineFeature = new OlFeature(undefined, false);
        olLineFeature.setStyle(this.createLineStyle(labelRotAngle));
        olLineFeature.setGeometry(OlGeometry.fromPoint(pointSearchResult.getPosition()));

        layer.addFeature(olLineFeature);
        layer.addFeature(olFeature);
    }


    private static createPointStyle(name: string, labelRotAngle: Angle): Style {
        const offsetX = Math.sin(labelRotAngle.rad) * LABEL_DIST_PIXEL;
        const offsetY = -Math.cos(labelRotAngle.rad) * LABEL_DIST_PIXEL;

        return new Style({
            image: new Circle({
                radius: POINT_RADIUS_PIXEL,
                fill: new Fill({
                    color: '#FFFFFF'
                }),
                stroke: new Stroke({
                    color: '#000000',
                    width: 2
                })
            }),
            text: new Text({
                font: 'bold 20px Calibri,sans-serif',
                text: name,
                fill: new Fill( { color: '#660066' } ),
                stroke: new Stroke( {color: '#FFFFFF', width: 20 } ),
                offsetX: offsetX,
                offsetY: offsetY
            })
        });
    }


    private static createLineStyle(labelRotAngle: Angle): Style {
        return new Style({
            image: new RegularShape({
                points: 1,
                radius1: LABEL_DIST_PIXEL,
                radius2: -POINT_RADIUS_PIXEL,
                angle: labelRotAngle.rad,
                stroke : new Stroke({
                    color: '#000000',
                    width: 3
                })
            })
        });
    }
}
