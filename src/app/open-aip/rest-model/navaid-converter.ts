import {Navaid} from '../domain-model/navaid';
import {IRestNavaid} from './i-rest-navaid';
import {Position2dConverter} from '../../geo-math/rest-model/position2d-converter';
import {LengthConverter} from '../../geo-math/rest-model/length-converter';
import {NavaidType} from '../domain-model/navaid-type';


export class NavaidConverter {
    public static fromRest(restItem: IRestNavaid): Navaid {
        return new Navaid(
            restItem.id,
            this.getNavaidTypeFromRestType(restItem.type),
            restItem.kuerzel,
            restItem.name,
            Position2dConverter.fromRest(restItem.pos),
            LengthConverter.fromRest(restItem.elevation),
            restItem.frequency,
            restItem.unit,
            restItem.declination,
            restItem.truenorth);
    }


    private static getNavaidTypeFromRestType(restType: string): NavaidType {
        switch (restType) {
            case 'NDB' : return NavaidType.NDB;
            case 'VOR-DME' : return NavaidType.VOR_DME;
            case 'DVOR-DME' : return NavaidType.DVOR_DME;
            case 'VOR' : return NavaidType.VOR;
            case 'DVOR' : return NavaidType.DVOR;
            case 'DME' : return NavaidType.DME;
            case 'TACAN' : return NavaidType.TACAN;
            case 'VORTAC' : return NavaidType.VORTAC;
            case 'DVORTAC' : return NavaidType.DVORTAC;
            default: return undefined;
        }
    }
}
