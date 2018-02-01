import { UnitconversionService } from '../../services/utils/unitconversion.service';
import { GeocalcService } from '../../services/utils/geocalc.service';
import {OlClickableFeature, OlFeaturePoint} from './ol-feature';
import { Traffic, TrafficAircraftType, TrafficPosition } from '../traffic';
import { environment } from '../../../environments/environment';
import * as ol from 'openlayers';


const MAX_AGE_SEC_TRACK_DOT = 120;


export class OlTraffic extends OlFeaturePoint implements OlClickableFeature {
    public constructor(
        private traffic: Traffic) {

        super();
    }


    public onFeatureClicked() {
        // TODO
    }


    public getPosition() {
        const trafficPos = this.traffic.getCurrentTrafficPosition();
        if (trafficPos) {
            return trafficPos.position;
        } else {
            return undefined;
        }
    }


    public draw(source: ol.source.Vector) {
        // draw dot trail
        const maxIdx = this.traffic.positions.length - 1;
        for (let i = maxIdx; i >= 0; i--) {
            if (Date.now() - this.traffic.positions[i].position.timestamp.getMs() < MAX_AGE_SEC_TRACK_DOT * 1000) {
                const trackDotFeature = this.createTrackDotFeature(this.traffic.positions[i]);
                source.addFeature(trackDotFeature);
            } else {
                break;
            }
        }

        // draw traffic
        super.draw(source);

        // draw callsign
        if (this.traffic.registration || this.traffic.callsign) {
            const csFeature = this.createRegistrationCallsignFeature();
            source.addFeature(csFeature);
        }
    }


    protected createPointStyle() {
        const ac = this.traffic;
        const position = ac.getCurrentTrafficPosition().position;
        if (!position) {
            return undefined;
        }

        let icon = environment.iconBaseUrl;
        let color = '#FF0000';
        let heighttext = '';
        let typetext = '';
        let rotation = this.getRotation();

        if (!ac.registration) {
            ac.registration = '';
        }

        if (position.hasAltitude() && position.altitude.getInFt() > 0) {
            heighttext = Math.round(position.altitude.getInFt()).toString() + ' ft'; // TODO: einstellbar
        }

        let iconSuffix = '';
        if (ac.isInactive()) {
            iconSuffix = '_inactive';
        }

        let rotWithView = true;

        switch (ac.actype) {
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


    private createRegistrationCallsignFeature(): ol.Feature {
        const color = '#FF0000';
        const bgColor = '#FFFFFF';
        let regCallText = '';

        if (this.traffic.opCallsign) {
            regCallText = this.traffic.opCallsign;
        } else if (this.traffic.callsign && !this.equalsRegCall()) {
            regCallText = this.traffic.callsign;
        } else if (this.traffic.registration) {
            regCallText = this.traffic.registration;
        }

        const position = this.traffic.positions[this.traffic.positions.length - 1];

        const csFeature = new ol.Feature({
            geometry: new ol.geom.Point(position.position.getMercator())
        });

        csFeature.setStyle(
            new ol.style.Style({
                text: new ol.style.Text({
                    font: 'bold 14px Calibri,sans-serif',
                    text: regCallText,
                    fill: new ol.style.Fill({color: color}),
                    stroke: new ol.style.Stroke({color: bgColor, width: 2}),
                    offsetX: 0,
                    offsetY: -35
                })
            })
        );

        return csFeature;
    }


    private equalsRegCall(): boolean {
        const regStripped = this.traffic.registration.toUpperCase().replace(/[^A-Z0-9]/g, '');
        const callStripped = this.traffic.callsign.toUpperCase().replace(/[^A-Z0-9]/g, '');

        return regStripped === callStripped;
    }



    private createTrackDotFeature(position: TrafficPosition): ol.Feature {
        let color: string;

        if (this.traffic.actype === TrafficAircraftType.OWN) {
            color = '#0000FF';
        } else {
            color = '#FF0000';
        }

        const trackPoint = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([position.position.longitude, position.position.latitude]))
        });

        trackPoint.setStyle(
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 2,
                    fill: new ol.style.Fill({
                        color: color
                    })
                })
            })
        );

        return trackPoint;
    }


    private getRotation(): number {
        if (!this.traffic.positions || this.traffic.positions.length < 2) {
            return 0;
        }

        const maxIdx = this.traffic.positions.length - 1;
        const rotation = GeocalcService.getBearing(
            this.traffic.positions[maxIdx - 1].position.latitude,
            this.traffic.positions[maxIdx - 1].position.longitude,
            this.traffic.positions[maxIdx].position.latitude,
            this.traffic.positions[maxIdx].position.longitude,
            0);
        return rotation;
    }
}
