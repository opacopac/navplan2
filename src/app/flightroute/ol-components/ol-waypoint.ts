import {Feature} from 'ol';
import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {OlWaypointBearingLabel} from './ol-waypoint-bearing-label';
import {Waypoint} from '../domain-model/waypoint';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlWaypoint {
    private readonly pointFeature: Feature;
    private readonly bearingLabel: OlWaypointBearingLabel;


    constructor(
        waypoint: Waypoint,
        nextWaypoint: Waypoint,
        mapRotation: Angle,
        layer: VectorLayer
    ) {
        this.pointFeature = OlHelper.createFeature(waypoint, true);
        this.pointFeature.setStyle(this.createStyle(waypoint, nextWaypoint, mapRotation));
        this.pointFeature.setGeometry(OlHelper.getPointGeometry(waypoint.position));
        layer.getSource().addFeature(this.pointFeature);

        this.bearingLabel = new OlWaypointBearingLabel(waypoint, nextWaypoint, mapRotation, layer);
    }


    private createStyle(wp: Waypoint, nextWp: Waypoint, mapRotation: Angle): Style {
        const text = wp ? wp.checkpoint : undefined;
        const mt = wp ? wp.mt : undefined;
        const nextMt = nextWp ? nextWp.mt : undefined;
        let rot_deg, rot_rad: number;
        let align: string;
        let rotateWithView = true;

        if (mt && nextMt) {
            // en route point
            if (nextMt.deg > mt.deg) {
                rot_deg = (mt.deg + 270 + (nextMt.deg - mt.deg) / 2) % 360;
            } else {
                rot_deg = (mt.deg + 270 + (nextMt.deg + 360 - mt.deg) / 2) % 360;
            }
        } else if (!mt && nextMt) {
            // start point
            rot_deg = (nextMt.deg + 180) % 360;
        } else if (mt && !nextMt) {
            // end point
            rot_deg = mt.deg;
        } else if (!mt && !nextMt) {
            // single point
            rot_deg = 45; // 45°
            rotateWithView = false;
        } else {
            return undefined;
        }

        if (!rotateWithView || (rot_deg + mapRotation.deg) % 360 < 180) {
            align = 'start';
        } else {
            align = 'end';
        }

        if (rotateWithView) {
            rot_rad = Angle.deg2rad(rot_deg + mapRotation.deg);
        } else {
            rot_rad = Angle.deg2rad(rot_deg);
        }

        return new Style({
            image: new Circle({
                radius: 6,
                fill: new Fill({
                    color: '#FF00FF'
                    // TODO: rotateWithView: true
                })
            }),
            text: new Text({
                font: 'bold 16px Calibri,sans-serif',
                text: text,
                fill: new Fill({color: '#660066'}),
                stroke: new Stroke({color: '#FFFFFF', width: 10}),
                textAlign: align,
                offsetX: 20 * Math.sin(rot_rad),
                offsetY: -20 * Math.cos(rot_rad),
                rotateWithView: false // reason: label may be upside-down after rotation --> recalc
            })
        });
    }
}
