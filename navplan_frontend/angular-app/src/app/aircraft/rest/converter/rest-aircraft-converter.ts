import {Aircraft} from '../../domain/model/aircraft';
import {IRestAircraft} from '../model/i-rest-aircraft';


export class RestAircraftConverter {
    public static fromRest(restAircraft: IRestAircraft): Aircraft {
        return new Aircraft(
            restAircraft.id,
            restAircraft.registration,
            restAircraft.type
        );
    }


    public static toRest(aircraft: Aircraft): IRestAircraft {
        return {
            id: aircraft.id,
            registration: aircraft.registration,
            type: aircraft.type
        };
    }
}
