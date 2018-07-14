import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Traffic, TrafficAircraftType} from '../model/traffic';
import {environment} from '../../../environments/environment';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {GeocalcService} from '../../shared/services/geocalc/geocalc.service';
import {OlTrafficTrail} from './ol-traffic-trail';


export class OlTraffic extends OlComponent {
    private readonly olTrafficFeature: ol.Feature;
    private readonly olCallsignFeature: ol.Feature;
    private readonly olDotTrailFeature: OlTrafficTrail;


    constructor(
        traffic: Traffic,
        private readonly source: ol.source.Vector) {

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


    destroy() {
        this.olDotTrailFeature.destroy();
        this.removeFeatures([this.olTrafficFeature, this.olCallsignFeature], this.source);
    }


    protected getTrafficStyle(traffic: Traffic) {
        const position = traffic.getCurrentPosition().position;
        if (!position) {
            return undefined;
        }

        let icon = environment.iconBaseUrl;
        let color = '#FF0000';
        let heighttext = '';
        let typetext = '';
        let rotation = this.getRotation(traffic);

        if (!traffic.registration) {
            traffic.registration = '';
        }

        if (position.hasAltitude() && position.altitude.ft > 0) {
            heighttext = Math.round(position.altitude.ft).toString() + ' ft'; // TODO: einstellbar
        }

        let iconSuffix = '';
        if (traffic.isInactive()) {
            iconSuffix = '_inactive';
        }

        let rotWithView = true;

        switch (traffic.actype) {
            case TrafficAircraftType.OWN:
                icon += 'own_plane.png';
                color = '#0000FF';
                break;
            case TrafficAircraftType.HELICOPTER_ROTORCRAFT:
                icon += 'traffic_heli' + iconSuffix + '.png';
                break;
            case TrafficAircraftType.GLIDER:
                icon += 'traffic_glider' + iconSuffix + '.png';
                break;
            case TrafficAircraftType.PARACHUTE:
            case TrafficAircraftType.HANG_GLIDER:
            case TrafficAircraftType.PARA_GLIDER:
                icon += 'traffic_parachute' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficAircraftType.BALLOON:
            case TrafficAircraftType.AIRSHIP:
                icon += 'traffic_balloon' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficAircraftType.UNKNOWN:
                icon += 'traffic_unknown' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficAircraftType.STATIC_OBJECT:
                icon += 'traffic_static' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficAircraftType.DROP_PLANE:
                typetext = ' - Drop Plane';
                icon += 'traffic_plane' + iconSuffix + '.png';
                break;
            case TrafficAircraftType.UFO:
                typetext = ' - UFO';
                icon += 'traffic_plane' + iconSuffix + '.png';
                break;
            case TrafficAircraftType.UAV:
                icon += 'traffic_uav' + iconSuffix + '.png';
                break;
            case TrafficAircraftType.JET_AIRCRAFT:
                icon += 'traffic_jetplane' + iconSuffix + '.png';
                break;
            case TrafficAircraftType.POWERED_AIRCRAFT:
            case TrafficAircraftType.TOW_PLANE:
            default:
                icon += 'traffic_plane' + iconSuffix + '.png';
                break;
        }

        return new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 1.00,
                rotation: UnitconversionService.deg2rad(rotation),
                rotateWithView: rotWithView,
                src: icon
            }),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: heighttext + typetext,
                fill: new ol.style.Fill({color: color}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 35
            })});
    }


    private getCallsignStyle(traffic: Traffic): ol.style.Style {
        const color = '#FF0000';
        const bgColor = '#FFFFFF';

        return new ol.style.Style({
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: traffic.getCommonName(),
                fill: new ol.style.Fill({color: color}),
                stroke: new ol.style.Stroke({color: bgColor, width: 2}),
                offsetX: 0,
                offsetY: -35
            })
        });
    }


    private getRotation(traffic: Traffic): number {
        if (!traffic.positions || traffic.positions.length < 2) {
            return 0;
        }

        const maxIdx = traffic.positions.length - 1;
        const rotation = GeocalcService.getBearing_old(
            traffic.positions[maxIdx - 1].position,
            traffic.positions[maxIdx].position,
            0);
        return rotation;
    }
}
