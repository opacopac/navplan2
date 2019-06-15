import {Navaid, NavaidType} from '../domain/navaid';
import {IRestNavaid} from './i-rest-navaid';
import {RestPosition2d} from '../../shared/model/rest/rest-position2d';
import {RestLength} from '../../shared/model/rest/rest-length';


export class RestNavaid {
    public static fromRest(restItem: IRestNavaid): Navaid {
        return new Navaid(
            restItem.id,
            this.getNavaidTypeFromRestType(restItem.type),
            restItem.kuerzel,
            restItem.name,
            RestPosition2d.fromRest(restItem.pos),
            RestLength.fromRest(restItem.elevation),
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
