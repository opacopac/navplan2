import {Feature} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {SearchItem} from '../domain-model/search-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Point} from 'ol/geom';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


const LABEL_DIST_PIXEL = 100;
const POINT_RADIUS_PIXEL = 5;


export class OlPositionSearchItem {
    private readonly olFeature: Feature;


    public constructor(
        searchItem: SearchItem,
        labelRotAngle: Angle,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(searchItem.dataItem, true);
        this.olFeature.setStyle(this.createPointStyle(searchItem.getGeoselectionName(), labelRotAngle));
        this.olFeature.setGeometry(OlHelper.getPointGeometry(searchItem.getPosition()));

        const olLineFeature = this.createLineFeature(searchItem.getPosition(), labelRotAngle);

        layer.getSource().addFeature(olLineFeature);
        layer.getSource().addFeature(this.olFeature);
    }


    protected createPointStyle(name: string, labelRotAngle: Angle): Style {
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


    private createLineFeature(position: Position2d, labelRotAngle: Angle): Feature {
        const lineFeature = new Feature({
            geometry: new Point(OlHelper.getMercator(position))
        });

        lineFeature.setStyle(
            new Style({
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
            })
        );

        return lineFeature;
    }
}
