import {Navaid} from '../../enroute/domain-model/navaid';
import {IRestNavaid} from './i-rest-navaid';
import {Position2dConverter} from '../../common/geo-math/rest-model/position2d-converter';
import {RestLengthConverter} from '../../common/geo-math/rest-model/rest-length-converter';
import {NavaidType} from '../../enroute/domain-model/navaid-type';


export class RestNavaidConverter {
    public static fromRest(restItem: IRestNavaid): Navaid {
        return new Navaid(
            restItem.id,
            this.getNavaidTypeFromRestType(restItem.type),
            restItem.kuerzel,
            restItem.name,
            Position2dConverter.fromRest(restItem.pos),
            RestLengthConverter.fromRest(restItem.elevation),
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


    public static fromRestList(restNavaidList: IRestNavaid[]): Navaid[] {
        return restNavaidList.map(restNavaid => RestNavaidConverter.fromRest(restNavaid));
    }
}
