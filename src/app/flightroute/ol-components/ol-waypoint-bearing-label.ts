import {Feature} from 'ol';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {Waypoint} from '../domain-model/waypoint';
import {LengthUnit} from '../../common/geo-math/domain-model/quantities/units';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlWaypointBearingLabel {
    private readonly dirBearFeature: Feature;


    constructor(
        prevWaypoint: Waypoint,
        waypoint: Waypoint,
        mapRotation: Angle,
        layer: VectorLayer
    ) {
        this.dirBearFeature = new Feature();
        this.dirBearFeature.setStyle(this.createStyle(waypoint, mapRotation));
        this.dirBearFeature.setGeometry(OlHelper.getPointGeometry(prevWaypoint.position));
        layer.getSource().addFeature(this.dirBearFeature);
    }


    private createStyle(wp: Waypoint, mapRotation: Angle): Style {
        if (!wp) { return undefined; }

        const mt = wp.mt;
        const dist = wp.dist;

        if (!dist || !mapRotation) { return undefined; }

        let rotRad, offsetX: number;
        let align, text: string;

        if (!mt) {
            rotRad = 0;
            align = 'start';
            text = '';
            offsetX = 5;
        } else if ((mt.deg + mapRotation.deg + 360) % 360 < 180) {
            rotRad = Angle.deg2rad(mt.deg - 90);
            align = 'start';
            text = '   ' + Math.round(mt.deg) + '° ' + Math.ceil(dist.getValue(LengthUnit.NM)) + 'NM >';
            offsetX = 5;
        } else {
            rotRad = Angle.deg2rad(mt.deg - 270);
            align = 'end';
            text = '< ' + Math.round(mt.deg) + '° ' + Math.ceil(dist.getValue(LengthUnit.NM)) + 'NM   ';
            offsetX = -5;
        }

        return new Style({
            text: new Text({
                font: '14px Calibri,sans-serif',
                text: text,
                fill: new Fill({color: '#000000'}),
                stroke: new Stroke({color: '#FFFFFF', width: 10}),
                rotation: rotRad + mapRotation.rad,
                textAlign: align,
                offsetX: offsetX,
                rotateWithView: false // reason: label may be upside-down after rotation --> recalc
            })
        });
    }
}
