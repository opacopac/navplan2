import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {environment} from '../../../environments/environment';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {GeocalcService} from '../../shared/services/geocalc/geocalc.service';
import {Position4d} from '../../shared/model/geometry/position4d';


export class OlOwnPlane extends OlComponent {
    private readonly olOwnPlane: ol.Feature;


    constructor(
        lastPositions: Position4d[],
        private readonly source: ol.source.Vector) {

        super();


        this.olOwnPlane = new ol.Feature();
        this.olOwnPlane.setStyle(this.getStyle(lastPositions));
        this.setPointGeometry(this.olOwnPlane, this.getCurrentPosition(lastPositions));
        this.source.addFeature(this.olOwnPlane);
    }


    public get isSelectable(): boolean {
        return false;
    }


    protected getStyle(lastPositions: Position4d[]) {
        if (!lastPositions || lastPositions.length === 0) {
            return undefined;
        }

        const position = this.getCurrentPosition(lastPositions);
        const rotation = this.getRotation(lastPositions);

        let heighttext = '';
        if (position.hasAltitude() && position.altitude.ft > 0) {
            heighttext = Math.round(position.altitude.ft).toString() + ' ft'; // TODO: einstellbar
        }

        const icon = environment.iconBaseUrl + 'own_plane.png';

        return new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 1.00,
                rotation: UnitconversionService.deg2rad(rotation),
                rotateWithView: true,
                src: icon
            }),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                fill: new ol.style.Fill({color: '#0000FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                text: heighttext,
                offsetX: 0,
                offsetY: 35
            })});
    }


    private getRotation(lastPositions: Position4d[]): number {
        if (!lastPositions || lastPositions.length < 2) {
            return 0;
        }

        const maxIdx = lastPositions.length - 1;
        const rotation = GeocalcService.getBearing_old(
            lastPositions[maxIdx - 1],
            lastPositions[maxIdx],
            0);
        return rotation;
    }


    private getCurrentPosition(lastPositions: Position4d[]): Position4d {
        if (!lastPositions || lastPositions.length === 0) {
            return undefined;
        } else {
            return lastPositions[lastPositions.length - 1];
        }
    }
}
