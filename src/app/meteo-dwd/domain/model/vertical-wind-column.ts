import {Length} from '../../../geo-physics/domain/model/quantities/length';
import { VerticalWindLevel } from './vertical-wind-level';


export class VerticalWindColumn {
    public constructor(
        public horDist: Length,
        public windLevels: VerticalWindLevel[]
    ) {
    }
}
