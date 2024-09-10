import {AircraftTypeDesignator} from '../../domain/model/aircraft-type-designator';
import {IRestAircraftTypeDesignator} from '../model/i-rest-aircraft-type-designator';
import {AircraftType} from '../../domain/model/aircraft-type';
import {EngineType} from '../../domain/model/engine-type';


export class RestAircraftTypeDesignatorConverter {
    public static fromRest(restTypeDesignator: IRestAircraftTypeDesignator): AircraftTypeDesignator {
        return new AircraftTypeDesignator(
            restTypeDesignator.id,
            restTypeDesignator.designator,
            restTypeDesignator.model,
            restTypeDesignator.manufacturer,
            AircraftType[restTypeDesignator.acType],
            EngineType[restTypeDesignator.engType],
            restTypeDesignator.engCount,
            restTypeDesignator.wtc
        );
    }


    public static toRest(typeDesignator: AircraftTypeDesignator): IRestAircraftTypeDesignator {
        return {
            id: typeDesignator.id,
            designator: typeDesignator.designator,
            model: typeDesignator.model,
            manufacturer: typeDesignator.manufacturer,
            acType: AircraftType[typeDesignator.ac_type],
            engType: EngineType[typeDesignator.engine_type],
            engCount: typeDesignator.engine_count,
            wtc: typeDesignator.wtc
        };
    }


    public static fromRestList(restTypeDesignators: IRestAircraftTypeDesignator[]): AircraftTypeDesignator[] {
        return restTypeDesignators.map(restTypeDesignator => RestAircraftTypeDesignatorConverter.fromRest(restTypeDesignator));
    }


    public static toRestList(typeDesignators: AircraftTypeDesignator[]): IRestAircraftTypeDesignator[] {
        return typeDesignators.map(typeDesignator => RestAircraftTypeDesignatorConverter.toRest(typeDesignator));
    }
}
