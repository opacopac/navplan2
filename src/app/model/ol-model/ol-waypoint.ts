import { OlFeature } from './ol-feature';
import { Waypoint } from '../waypoint';
import * as ol from 'openlayers';
import { UnitconversionService } from '../../services/utils/unitconversion.service';


export class OlWaypoint extends OlFeature {
    constructor(
        public waypoint: Waypoint,
        public nextWaypoint: Waypoint,
        public mapRotationRad: number) {

        super(waypoint);
    }


    public draw(source: ol.source.Vector): void {
        // draw waypoint + label
        if (!this.waypoint || !this.waypoint.position) {
            return;
        }

        this.setGeometry(new ol.geom.Point(this.waypoint.position.getMercator()));

        const style = this.createPointStyle(this.waypoint, this.nextWaypoint, this.mapRotationRad);
        if (style) {
            this.setStyle(style);
            source.addFeature(this);
        }


        // add direction & bearing label
        if (this.nextWaypoint) {
            const dbFeature = new ol.Feature({
                geometry: new ol.geom.Point(this.waypoint.position.getMercator())
            });

            const dbStyle = this.createDirBearStyle(this.nextWaypoint, this.mapRotationRad);
            dbFeature.setStyle(dbStyle);
            source.addFeature(dbFeature);
        }
    }


    protected createPointStyle(wp1: Waypoint, wp2: Waypoint, mapRotationRad: number): ol.style.Style {
        let rotDeg, rotRad, align;
        const maprotDeg = UnitconversionService.rad2deg(mapRotationRad);
        let rotateWithView = true;

        if (wp1.mt && wp2) {
            // en route point
            if (wp2.mt > wp1.mt) {
                rotDeg = (wp1.mt + 270 + (wp2.mt - wp1.mt) / 2) % 360;
            } else {
                rotDeg = (wp1.mt + 270 + (wp2.mt + 360 - wp1.mt) / 2) % 360;
            }
        } else if (!wp1.mt && wp2) {
            // start point
            rotDeg = (wp2.mt + 180) % 360;
        } else if (wp1.mt && !wp2) {
            // end point
            rotDeg = wp1.mt;
        } else if (!wp1.mt && !wp2) {
            // single point
            rotDeg = 45; // 45°
            rotateWithView = false;
        } else {
            return undefined;
        }

        if (!rotateWithView || (rotDeg + maprotDeg) % 360 < 180) {
            align = 'end';
        } else {
            align = 'start';
        }

        if (rotateWithView) {
            rotRad = UnitconversionService.deg2rad(rotDeg + maprotDeg);
        } else {
            rotRad = UnitconversionService.deg2rad(rotDeg);
        }

        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#FF00FF'
                    // TODO: rotateWithView: true
                })
            }),
            text: new ol.style.Text({
                font: 'bold 16px Calibri,sans-serif',
                text: wp1.checkpoint,
                fill: new ol.style.Fill({color: '#660066'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 10}),
                textAlign: align,
                offsetX: 15 * Math.sin(rotRad),
                offsetY: -15 * Math.cos(rotRad)
            })
        });
    }


    private createDirBearStyle(wp: Waypoint, mapRotationRad: number): ol.style.Style {
        const varRad = Number(wp) ? UnitconversionService.deg2rad(wp.mt) : 0;
        const maprotDeg = UnitconversionService.rad2deg(mapRotationRad);
        let rotRad, align, text;

        if (!wp) {
            rotRad = 0;
            align = 'end';
            text = '';
        } else if ((wp.mt + maprotDeg + 360) % 360 < 180) {
            rotRad = UnitconversionService.deg2rad(wp.mt - 90);
            align = 'end';
            text = '   ' + wp.mt + '° ' + wp.dist + 'NM >';
        } else {
            rotRad = UnitconversionService.deg2rad(wp.mt - 270);
            align = 'start';
            text = '< ' + wp.mt + '° ' + wp.dist + 'NM   ';
        }

        return new ol.style.Style({
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill({color: '#000000'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 10}),
                rotation: rotRad + varRad + mapRotationRad,
                textAlign: align,
            })
        });
    }
}
