import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {CloudMeteogramStep} from './cloud-meteogram-step';


export class CloudMeteogram {
    public constructor(
        public elevation: Length,
        public steps: CloudMeteogramStep[]
    ) {
    }
}
