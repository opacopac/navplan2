import {createAction, props} from '@ngrx/store';
import {WeightItem} from '../../../aircraft-wnb/domain/model/weight-item';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Volume} from '../../../geo-physics/domain/model/quantities/volume';


export class PlanWnbActions {
    public static readonly weightOfItemChanged = createAction(
        '[PlanWnbPage] weight of item changed',
        props<{ weightItem: WeightItem, newWeight: Weight, newFuel: Volume }>()
    );
}
