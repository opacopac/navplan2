import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Navaid} from '../../../domain/model/navaid';
import {OlNavaidIcon} from './ol-navaid-icon';
import {NavaidType} from '../../../domain/model/navaid-type';


export class OlNavaidStyle {
    private static readonly FILL = new Fill({color: '#451A57'});
    private static readonly STROKE = new Stroke({color: '#FFFFFF', width: 2});


    public static createPointStyle(navaid: Navaid): Style {
        let icon: Icon;
        let textOffsetY: number;
        switch (navaid.type) {
            case NavaidType.NDB:
                icon = OlNavaidIcon.NDB;
                textOffsetY = 33;
                break;
            case NavaidType.VOR_DME:
            case NavaidType.DVOR_DME:
                icon = OlNavaidIcon.VOR_DME;
                textOffsetY = 22;
                break;
            case NavaidType.VOR:
            case NavaidType.DVOR:
                icon = OlNavaidIcon.VOR;
                textOffsetY = 22;
                break;
            case NavaidType.DME:
                icon = OlNavaidIcon.DME;
                textOffsetY = 22;
                break;
            case NavaidType.TACAN:
                icon = OlNavaidIcon.TACAN;
                textOffsetY = 25;
                break;
            case NavaidType.VORTAC:
            case NavaidType.DVORTAC:
                icon = OlNavaidIcon.VORTAC;
                textOffsetY = 25;
                break;
            default:
                return undefined;
        }


        return new Style({
            image: icon,
            text: new Text({
                // textAlign: align,
                // textBaseline: baseline,
                font: 'bold 14px Calibri,sans-serif',
                text: navaid.kuerzel,
                fill: this.FILL,
                stroke: this.STROKE,
                offsetX: 0,
                offsetY: textOffsetY
            })
        });
    }
}
