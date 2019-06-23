import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {Angle} from '../../shared/model/quantities/angle';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {OlWaypointBearingLabel} from './ol-waypoint-bearing-label';
import {Waypoint} from '../domain/waypoint';


export class OlWaypoint extends OlComponentBase {
    private readonly pointFeature: Feature;
    private readonly bearingLabel: OlWaypointBearingLabel;


    constructor(
        waypoint: Waypoint,
        nextWaypoint: Waypoint,
        mapRotation: Angle,
        private readonly source: Vector) {

        super();

        this.pointFeature = this.createFeature(waypoint);
        this.pointFeature.setStyle(this.createStyle(waypoint, nextWaypoint, mapRotation));
        this.setPointGeometry(this.pointFeature, waypoint.position);
        this.source.addFeature(this.pointFeature);

        this.bearingLabel = new OlWaypointBearingLabel(waypoint, nextWaypoint, mapRotation, source);
    }


    public get isSelectable(): boolean {
        return true;
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
            align = 'end';
        } else {
            align = 'start';
        }

        if (rotateWithView) {
            rot_rad = UnitconversionService.deg2rad(rot_deg + mapRotation.deg);
        } else {
            rot_rad = UnitconversionService.deg2rad(rot_deg);
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
