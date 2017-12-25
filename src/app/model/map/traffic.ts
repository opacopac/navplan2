import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position4d } from '../position';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';
import { UnitconversionService } from '../../services/unitconversion.service';

const MAX_AGE_SEC_INACTIVE = 30;


// region ENUMS

export enum TrafficType {
    'OWN',
    'HELICOPTER_ROTORCRAFT',
    'GLIDER',
    'PARACHUTE',
    'HANG_GLIDER',
    'PARA_GLIDER',
    'BALLOON',
    'AIRSHIP',
    'UNKNOWN',
    'STATIC_OBJECT',
    'DROP_PLANE',
    'UFO',
    'UAV',
    'JET_AIRCRAFT',
    'POWERED_AIRCRAFT',
    'TOW_PLANE',
}


export enum TrafficDataSource {
    OGN,
    ADSBX,
    OWN
}


export enum TrafficPositionMethod {
    FLARM,
    ADSB,
    MLAT,
    OWN
}

// endregion


export class TrafficPosition {
    constructor(
        public position: Position4d,
        public method: TrafficPositionMethod,
        public receiver: string,
        public receivedTimeStampMs: number) {
    }
}


export class Traffic implements MapItemModel {
    constructor(
        public acaddress: string,
        public addresstype: string,
        public actype: TrafficType,
        public registration: string,
        public callsign: string,
        public opCallsign: string,
        public aircraftModelType: string,
        public positions: TrafficPosition[]) {
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position4d {
        const trafficPos = this.getCurrentTrafficPosition();
        if (trafficPos) {
            return trafficPos.position;
        } else {
            return undefined;
        }
    }


    public getCurrentTrafficPosition(): TrafficPosition {
        if (!this.positions || this.positions.length === 0) {
            return undefined;
        }

        return this.positions[this.positions.length - 1];
    }


    public isInactive(): boolean {
        const pos = this.getCurrentTrafficPosition();

        if (!pos || Date.now() - pos.position.timestamp.getMs() > MAX_AGE_SEC_INACTIVE * 1000) {
            return true;
        } else {
            return false;
        }
    }
}


export class TrafficOlFeature extends MapItemOlFeature {
    public mapItemModel: Traffic;


    public constructor(traffic: Traffic) {
        super(traffic);
    }


    public draw(source: ol.source.Vector) {
        // draw traffic
        super.draw(source);

        // draw dot trail
        // TODO
    }


    protected createOlStyle() {
        const ac = this.mapItemModel;
        const position = ac.getCurrentTrafficPosition().position;
        if (!position) {
            return undefined;
        }

        let icon = environment.iconBaseUrl;
        let color = '#FF0000';
        let heighttext = '';
        let typetext = '';
        let rotation = 0;

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
            case TrafficType.OWN:
                icon += 'own_plane.png';
                color = '#0000FF';
                break;
            case TrafficType.HELICOPTER_ROTORCRAFT:
                icon += 'traffic_heli' + iconSuffix + '.png';
                break;
            case TrafficType.GLIDER:
                icon += 'traffic_glider' + iconSuffix + '.png';
                break;
            case TrafficType.PARACHUTE:
            case TrafficType.HANG_GLIDER:
            case TrafficType.PARA_GLIDER:
                icon += 'traffic_parachute' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficType.BALLOON:
            case TrafficType.AIRSHIP:
                icon += 'traffic_balloon' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficType.UNKNOWN:
                icon += 'traffic_unknown' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficType.STATIC_OBJECT:
                icon += 'traffic_static' + iconSuffix + '.png';
                rotation = 0;
                rotWithView = false;
                break;
            case TrafficType.DROP_PLANE:
                typetext = ' - Drop Plane';
                icon += 'traffic_plane' + iconSuffix + '.png';
                break;
            case TrafficType.UFO:
                typetext = ' - UFO';
                icon += 'traffic_plane' + iconSuffix + '.png';
                break;
            case TrafficType.UAV:
                icon += 'traffic_uav' + iconSuffix + '.png';
                break;
            case TrafficType.JET_AIRCRAFT:
                icon += 'traffic_jetplane' + iconSuffix + '.png';
                break;
            case TrafficType.POWERED_AIRCRAFT:
            case TrafficType.TOW_PLANE:
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
}

