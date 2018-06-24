import * as ol from 'openlayers';
import { UnitconversionService } from '../../services/utils/unitconversion.service';
import { OlFeaturePoint } from './ol-feature';
import { Position2d} from '../geometry/position2d';
import { SearchItem } from '../search-item';


const LABEL_DIST_PIXEL = 100;
const POINT_RADIUS_PIXEL = 5;


export class OlSearchItem extends OlFeaturePoint {
    constructor(
        public searchItem: SearchItem,
        public labelRotAngle_deg: number) {

        super(searchItem.dataItem);
    }


    public draw(source: ol.source.Vector) {
        if (!this.searchItem || this.labelRotAngle_deg === undefined) {
            return;
        }

        // point
        super.draw(source);

        // line
        const lineFeature = this.createLineFeature();
        if (lineFeature) {
            source.addFeature(lineFeature);
        }
    }


    protected getPosition(): Position2d {
        return this.searchItem.getPosition();
    }


    protected createPointStyle(): ol.style.Style {
        const offsetX = Math.sin(UnitconversionService.deg2rad(this.labelRotAngle_deg)) * LABEL_DIST_PIXEL;
        const offsetY = -Math.cos(UnitconversionService.deg2rad(this.labelRotAngle_deg)) * LABEL_DIST_PIXEL;

        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: POINT_RADIUS_PIXEL,
                fill: new ol.style.Fill({
                    color: '#FFFFFF'
                }),
                stroke: new ol.style.Stroke({
                    color: '#000000',
                    width: 2
                })
            }),
            text: new ol.style.Text({
                font: 'bold 20px Calibri,sans-serif',
                text: this.searchItem.getGeoselectionName(),
                fill: new ol.style.Fill( { color: '#660066' } ),
                stroke: new ol.style.Stroke( {color: '#FFFFFF', width: 20 } ),
                offsetX: offsetX,
                offsetY: offsetY
            })
        });
    }


    private createLineFeature(): ol.Feature {
        const lineFeature = new ol.Feature({
            geometry: new ol.geom.Point(this.searchItem.getPosition().getMercator())
        });

        lineFeature.setStyle(
            new ol.style.Style({
                image: new ol.style.RegularShape({
                    points: 1,
                    radius1: LABEL_DIST_PIXEL,
                    radius2: -POINT_RADIUS_PIXEL,
                    angle: UnitconversionService.deg2rad(this.labelRotAngle_deg),
                    stroke : new ol.style.Stroke({
                        color: '#000000',
                        width: 3
                    })
                })
            })
        );

        return lineFeature;
    }
}
