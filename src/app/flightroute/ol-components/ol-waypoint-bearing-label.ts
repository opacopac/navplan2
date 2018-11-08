import * as ol from 'openlayers';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {Angle} from '../../shared/model/quantities/angle';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {Waypoint} from '../model/waypoint';
import {LengthUnit} from '../../shared/model/units';


export class OlWaypointBearingLabel extends OlComponentBase {
    private readonly dirBearFeature: ol.Feature;


    constructor(
        prevWaypoint: Waypoint,
        waypoint: Waypoint,
        mapRotation: Angle,
        private readonly source: ol.source.Vector) {

        super();

        this.dirBearFeature = new ol.Feature();
        this.dirBearFeature.setStyle(this.createStyle(waypoint, mapRotation));
        this.setPointGeometry(this.dirBearFeature, prevWaypoint.position);
        this.source.addFeature(this.dirBearFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private createStyle(wp: Waypoint, mapRotation: Angle): ol.style.Style {
        if (!wp) { return undefined; }

        const mt = wp.mt;
        const dist = wp.dist;

        if (!dist || !mapRotation) { return undefined; }

        let rotRad, offsetX: number;
        let align, text: string;

        if (!mt) {
            rotRad = 0;
            align = 'end';
            text = '';
            offsetX = 5;
        } else if ((mt.deg + mapRotation.deg + 360) % 360 < 180) {
            rotRad = UnitconversionService.deg2rad(mt.deg - 90);
            align = 'end';
            text = '   ' + Math.round(mt.deg) + '° ' + Math.ceil(dist.getValue(LengthUnit.NM)) + 'NM >';
            offsetX = 5;
        } else {
            rotRad = UnitconversionService.deg2rad(mt.deg - 270);
            align = 'start';
            text = '< ' + Math.round(mt.deg) + '° ' + Math.ceil(dist.getValue(LengthUnit.NM)) + 'NM   ';
            offsetX = -5;
        }

        return new ol.style.Style({
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill({color: '#000000'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 10}),
                rotation: rotRad + mapRotation.rad,
                textAlign: align,
                offsetX: offsetX,
                rotateWithView: false // reason: label may be upside-down after rotation --> recalc
            })
        });
    }
}
