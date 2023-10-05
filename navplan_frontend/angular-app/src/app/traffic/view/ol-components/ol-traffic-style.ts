import {Fill, Stroke, Style, Text} from 'ol/style';
import {Traffic} from '../../domain/model/traffic';
import {TrafficAircraftType} from '../../domain/model/traffic-aircraft-type';
import {OlTrafficIcon} from './ol-traffic-icon';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';


export class OlTrafficStyle {
    private static readonly MAX_AGE_SEC_INACTIVE = 30; // TODO
    private static readonly FILL = new Fill({color: '#FF0000'});
    private static readonly STROKE = new Stroke({color: '#FFFFFF', width: 2});


    public static getTrafficStyle(traffic: Traffic) {
        const position = traffic.getCurrentPosition().position;
        if (!position) {
            return undefined;
        }

        let heighttext = '';
        let typetext = '';
        let rotation = traffic.getRotation().deg;

        if (!traffic.registration) {
            traffic.registration = '';
        }

        if (position.hasAltitude() && position.altitude.value > 0) {
            heighttext = Math.round(position.altitude.value).toString() + ' '
                + AltitudeUnit[position.altitude.unit].toLowerCase(); // ' ft'; // TODO: einstellbar
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

        const icon = OlTrafficIcon.getIcon(traffic.acType, this.isInactive(traffic), rotation, rotWithView);

        return new Style({
            image: icon,
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: heighttext + typetext,
                fill: this.FILL,
                stroke: this.STROKE,
                offsetX: 0,
                offsetY: 35
            })});
    }


    public static getCallsignStyle(traffic: Traffic): Style {
        return new Style({
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: traffic.getCommonName(),
                fill: this.FILL,
                stroke: this.STROKE,
                offsetX: 0,
                offsetY: -35
            })
        });
    }


    private static isInactive(traffic: Traffic): boolean {
        const pos = traffic.getCurrentPosition();

        return (!pos || Date.now() - pos.position.timestamp.epochMs > OlTrafficStyle.MAX_AGE_SEC_INACTIVE * 1000);
    }
}
