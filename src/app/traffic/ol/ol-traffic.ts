import {Vector} from 'ol/source';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {Traffic} from '../domain/traffic';
import {TrafficAircraftType} from '../domain/traffic-aircraft-type';
import {OlTrafficTrail} from './ol-traffic-trail';
import {TrafficIcon} from '../domain/traffic-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {AltitudeUnit} from '../../geo-math/domain/geometry/altitude-unit';
import {Angle} from '../../geo-math/domain/quantities/angle';


const MAX_AGE_SEC_INACTIVE = 30; // TODO


export class OlTraffic extends OlComponentBase {
    private olDotTrailFeature: OlTrafficTrail;


    constructor(
        private readonly traffic: Traffic,
        private readonly source: Vector
    ) {
        super();

        this.olDotTrailFeature = new OlTrafficTrail(this.traffic, this.source);
    }


    public draw(): void {
        // dot trail feature
        this.olDotTrailFeature.draw();

        // traffic feature
        const olTrafficFeature = this.createFeature(this.traffic);
        olTrafficFeature.setStyle(this.getTrafficStyle(this.traffic));
        this.setPointGeometry(olTrafficFeature, this.traffic.getCurrentPosition().position);
        this.source.addFeature(olTrafficFeature);

        // call sign feature
        const olCallsignFeature = this.createFeature(this.traffic);
        olCallsignFeature.setStyle(this.getCallsignStyle());
        this.setPointGeometry(olCallsignFeature, this.traffic.getCurrentPosition().position);
        this.source.addFeature(olCallsignFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    protected getTrafficStyle(traffic: Traffic) {
        const position = traffic.getCurrentPosition().position;
        if (!position) {
            return undefined;
        }

        const icon = TrafficIcon.getUrl(traffic.acType, this.isInactive());
        let heighttext = '';
        let typetext = '';
        let rotation = traffic.getRotation().deg;

        if (!traffic.registration) {
            traffic.registration = '';
        }

        if (position.hasAltitude() && position.altitude.value > 0) {
            heighttext = Math.round(position.altitude.value).toString() + ' ' + AltitudeUnit[position.altitude.unit].toLowerCase(); // ' ft'; // TODO: einstellbar
        }

        let rotWithView = true;

        switch (traffic.acType) {
            case TrafficAircraftType.PARACHUTE:
            case TrafficAircraftType.HANG_GLIDER:
            case TrafficAircraftType.PARA_GLIDER:
            case TrafficAircraftType.BALLOON:
            case TrafficAircraftType.AIRSHIP:
            case TrafficAircraftType.UNKNOWN:
            case TrafficAircraftType.STATIC_OBJECT:
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficAircraftType.DROP_PLANE:
                typetext = ' - Drop Plane';
                break;
            case TrafficAircraftType.UFO:
                typetext = ' - UFO';
                break;
        }

        return new Style({
            image: new Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                opacity: 1.00,
                rotation: Angle.deg2rad(rotation),
                rotateWithView: rotWithView,
                src: icon
            }),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: heighttext + typetext,
                fill: new Fill({color: '#FF0000'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 35
            })});
    }


    private getCallsignStyle(): Style {
        const color = '#FF0000';
        const bgColor = '#FFFFFF';

        return new Style({
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: this.traffic.getCommonName(),
                fill: new Fill({color: color}),
                stroke: new Stroke({color: bgColor, width: 2}),
                offsetX: 0,
                offsetY: -35
            })
        });
    }


    private isInactive(): boolean {
        const pos = this.traffic.getCurrentPosition();

        return (!pos || Date.now() - pos.position.timestamp.epochMs > MAX_AGE_SEC_INACTIVE * 1000);
    }
}
