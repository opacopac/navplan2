import {createAction, props} from '@ngrx/store';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightItem} from '../../domain/model/weight-item';
import {WnbEnvelopeCoordinate} from '../../domain/model/wnb-envelope-coordinate';
import {WnbEnvelope} from '../../domain/model/wnb-envelope';


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

    public static readonly editWeightItem = createAction(
        '[Aircraft W&B] Edit weight item',
        props<{ weightItem: WeightItem, weightItemIndex: number }>()
    );


    public static readonly addEnvelope = createAction(
        '[Aircraft W&B] Add envelope',
        props<{ envelope: WnbEnvelope }>()
    );


    public static readonly updateEnvelope = createAction(
        '[Aircraft W&B] Update envelope',
        props<{ oldEnvelope: WnbEnvelope, newEnvelope: WnbEnvelope }>()
    );


    public static readonly deleteEnvelope = createAction(
        '[Aircraft W&B] Delete envelope',
        props<{ envelope: WnbEnvelope }>()
    );


    public static readonly addEnvelopeCoordinate = createAction(
        '[Aircraft W&B] Add envelope coordinate',
        props<{ envelope: WnbEnvelope, coordinate: WnbEnvelopeCoordinate, insertAtIndex: number }>()
    );


    public static readonly updateEnvelopeCoordinate = createAction(
        '[Aircraft W&B] Update envelope coordinate',
        props<{ envelope: WnbEnvelope, oldCoordinate: WnbEnvelopeCoordinate, newCoordinate: WnbEnvelopeCoordinate }>()
    );


    public static readonly deleteEnvelopeCoordinate = createAction(
        '[Aircraft W&B] Delete envelope coordinate',
        props<{ envelope: WnbEnvelope, coordinate: WnbEnvelopeCoordinate }>()
    );
}
