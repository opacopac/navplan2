import {Fill, Stroke, Style, Text} from 'ol/style';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class OlWaypointBearingLabel {
    public static draw(
        prevWaypoint: Waypoint,
        waypoint: Waypoint,
        mapRotation: Angle,
        layer: OlVectorLayer
    ) {
        const dirBearFeature = new OlFeature(undefined, false);
        dirBearFeature.setStyle(this.createStyle(waypoint, mapRotation));
        dirBearFeature.setGeometry(OlGeometry.fromPoint(prevWaypoint.position));
        layer.addFeature(dirBearFeature);
    }


    private static createStyle(wp: Waypoint, mapRotation: Angle): Style {
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
