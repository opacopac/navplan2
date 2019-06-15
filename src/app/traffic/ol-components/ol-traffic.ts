import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {Traffic, TrafficAircraftType} from '../domain/traffic';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {OlTrafficTrail} from './ol-traffic-trail';
import {TrafficIcon} from '../domain/traffic-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlTraffic extends OlComponentBase {
    private readonly olTrafficFeature: Feature;
    private readonly olCallsignFeature: Feature;
    private readonly olDotTrailFeature: OlTrafficTrail;


    constructor(
        traffic: Traffic,
        private readonly source: Vector) {

        super();


        // dot trail feature
        this.olDotTrailFeature = new OlTrafficTrail(traffic, this.source);

        // traffic feature
        this.olTrafficFeature = this.createFeature(traffic);
        this.olTrafficFeature.setStyle(this.getTrafficStyle(traffic));
        this.setPointGeometry(this.olTrafficFeature, traffic.getCurrentPosition().position);
        this.source.addFeature(this.olTrafficFeature);

        // call sign feature
        this.olCallsignFeature = this.createFeature(traffic);
        this.olCallsignFeature.setStyle(this.getCallsignStyle(traffic));
        this.setPointGeometry(this.olCallsignFeature, traffic.getCurrentPosition().position);
        this.source.addFeature(this.olCallsignFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    protected getTrafficStyle(traffic: Traffic) {
        const position = traffic.getCurrentPosition().position;
        if (!position) {
            return undefined;
        }

        const icon = TrafficIcon.getUrl(traffic.acType, traffic.isInactive());
        let heighttext = '';
        let typetext = '';
        let rotation = traffic.getRotation().deg;

        if (!traffic.registration) {
            traffic.registration = '';
        }

        if (position.hasAltitude() && position.altitude.ft > 0) {
            heighttext = Math.round(position.altitude.ft).toString() + ' ft'; // TODO: einstellbar
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
                rotation: UnitconversionService.deg2rad(rotation),
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


    private getCallsignStyle(traffic: Traffic): Style {
        const color = '#FF0000';
        const bgColor = '#FFFFFF';

        return new Style({
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: traffic.getCommonName(),
                fill: new Fill({color: color}),
                stroke: new Stroke({color: bgColor, width: 2}),
                offsetX: 0,
                offsetY: -35
            })
        });
    }
}
