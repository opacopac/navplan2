import {Position2d} from '../../../shared/model/geometry/position2d';
import {Navaid, NavaidType} from '../../model/navaid';


export interface NavaidRestItem {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    frequency: string;
    unit: string;
    declination: number;
    truenorth: boolean;
}


export class RestMapperNavaid {
    public static getNavaidFromRestItem(restItem: NavaidRestItem): Navaid {
        return new Navaid(
            restItem.id,
            this.getNavaidTypeFromRestType(restItem.type),
            restItem.kuerzel,
            restItem.name,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.elevation,
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
