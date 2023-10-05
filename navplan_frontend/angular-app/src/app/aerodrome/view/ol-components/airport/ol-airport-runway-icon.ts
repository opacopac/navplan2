import {environment} from '../../../../../environments/environment';
import {Icon} from 'ol/style';


export class OlAirportRunwayIcon {
    public static getRwyUrl(rwy_surface: string, isMilitary: boolean): string {
        const src = environment.iconBaseUrl;

        if (isMilitary) {
            return src + 'rwy_mil.svg';
        } else if (rwy_surface === 'ASPH' || rwy_surface === 'CONC') {
            return src + 'rwy_concrete.svg';
        } else if (rwy_surface !== 'WATE') {
            return src + 'rwy_grass.svg';
        } else {
            return undefined;
        }
    }


    public static createIcon(rwy_surface: string, isMilitary: boolean, rwy_direction: number): Icon {
        const src = this.getRwyUrl(rwy_surface, isMilitary);
        if (!src) {
            return undefined;
        }

        return new Icon(({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            scale: 1,
            rotation: (rwy_direction) / 180 * Math.PI,
            rotateWithView: true,
            opacity: 0.9,
            src: src
        }));
    }
}
