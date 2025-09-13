import {VerticalCloudLevel} from './vertical-cloud-level';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class VerticalCloudColumn {
    public constructor(
        public horDist: Length,
        public cloudLevels: VerticalCloudLevel[]
    ) {
    }
}
