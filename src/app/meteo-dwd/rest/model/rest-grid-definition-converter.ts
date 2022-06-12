import {IRestGridDefinition} from './i-rest-grid-definition';
import {GridDefinition} from '../../domain/model/grid-definition';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';


export class RestGridDefinitionConverter {
    public static fromRest(restGridDef: IRestGridDefinition): GridDefinition {
        return new GridDefinition(
            restGridDef.width,
            restGridDef.height,
            Position2dConverter.fromRest(restGridDef.minpos),
            restGridDef.steplat,
            restGridDef.steplon
        );
    }
}
