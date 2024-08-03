import {createAction, props} from '@ngrx/store';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightItem} from '../../domain/model/weight-item';


export class AircraftWnbActions {
    public static readonly changeMtow = createAction(
        '[Aircraft W&B] Change MTOW',
        props<{ mtow: Weight }>()
    );


    public static readonly changeBew = createAction(
        '[Aircraft W&B] Change BEW',
        props<{ bew: Weight }>()
    );

    public static readonly deleteWeightItem = createAction(
        '[Aircraft W&B] Delete weight item',
        props<{ weightItemIndex: number }>()
    );

    public static readonly addWeightItem = createAction(
        '[Aircraft W&B] Add weight item',
        props<{ weightItem: WeightItem }>()
    );
}
