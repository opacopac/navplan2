import * as ol from 'openlayers';
import { OlFeaturePoint } from '../../shared/model/ol-feature';
import { MetarTaf } from '../model/metar-taf';
import { Position2d } from '../../shared/model/geometry/position2d';
import { UnitconversionService } from '../../shared/services/unitconversion/unitconversion.service';
import {environment} from '../../../environments/environment';


export class OlMetarWind extends OlFeaturePoint {
    public constructor(
        private metarTaf: MetarTaf,
        private mapRotationRad: number) {

        super(metarTaf);
    }


    protected getPosition(): Position2d {
        return this.metarTaf.position;
    }


    protected createPointStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        let rot = this.metarTaf.wind_dir_deg ?
            UnitconversionService.deg2rad(this.metarTaf.wind_dir_deg + 90) + this.mapRotationRad : undefined;
        const windrange = [[0, '0'], [2, '1-2'], [7, '5'], [12, '10'], [17, '15'], [22, '20'], [27, '25'], [32, '30'],
            [37, '35'], [42, '40'], [47, '45'], [55, '50'], [65, '60'], [75, '70'], [85, '80'], [95, '90'], [105, '100']];


        for (let i = 0; i < windrange.length; i++) {
            if (this.metarTaf.wind_speed_kt <= windrange[i][0]) {
                src += 'wind_' + windrange[i][1] + 'kt.png';

                if (i === 0) {
                    rot = 0;
                }

                break;
            }
        }

        if (!src) {
            return;
        }

        const anchorX = -15 - 17;
        const anchorY = 5 - 17;
        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 17;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 17;

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: src
            }))
        });
    }
}
