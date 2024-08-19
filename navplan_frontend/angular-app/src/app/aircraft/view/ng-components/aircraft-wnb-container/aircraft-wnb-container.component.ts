import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {getVolumeUnit, getWeightUnit, getWnbLengthUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {AircraftWnbActions} from '../../../state/ngrx/aircraft-wnb-actions';
import {WeightItem} from '../../../domain/model/weight-item';
import {AircraftCrudActions} from '../../../state/ngrx/aircraft-crud-actions';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';


@Component({
    selector: 'app-aircraft-wnb-container',
    templateUrl: './aircraft-wnb-container.component.html',
    styleUrls: ['./aircraft-wnb-container.component.scss'],
})
export class AircraftWnbContainerComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly wnbLengthUnit$ = this.appStore.pipe(select(getWnbLengthUnit));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));
    protected readonly volumeUnit$ = this.appStore.pipe(select(getVolumeUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onChangeBew(bew: Weight) {
        this.appStore.dispatch(
            AircraftWnbActions.changeBew({bew: bew})
        );
    }


    protected onChangeMtow(mtow: Weight) {
        this.appStore.dispatch(
            AircraftWnbActions.changeMtow({mtow: mtow})
        );
    }


    protected onAddWeightItem(weightItem: WeightItem) {
        this.appStore.dispatch(
            AircraftWnbActions.addWeightItem({weightItem: weightItem})
        );
    }


    protected onEditWeightItem(weightItemAndIndex: [WeightItem, number]) {
        this.appStore.dispatch(
            AircraftWnbActions.editWeightItem({
                weightItem: weightItemAndIndex[0],
                weightItemIndex: weightItemAndIndex[1]
            })
        );
    }


    protected onDeleteWeightItem(weightItemIndex: number) {
        this.appStore.dispatch(
            AircraftWnbActions.deleteWeightItem({weightItemIndex: weightItemIndex})
        );
    }


    protected onSaveAircraftWnb() {
        this.appStore.dispatch(
            AircraftCrudActions.saveAircraft()
        );
    }

    protected onEnvelopeCoordinateAdded(envCoord: [WnbEnvelope, WnbEnvelopeCoordinate]) {
        this.appStore.dispatch(
            AircraftWnbActions.addEnvelopeCoordinate({
                envelope: envCoord[0],
                coordinate: envCoord[1]
            })
        );
    }

    protected onEnvelopeCoordinateUpdated($event: [WnbEnvelope, WnbEnvelopeCoordinate]) {
        this.appStore.dispatch(
            AircraftWnbActions.updateEnvelopeCoordinate({
                envelope: $event[0],
                coordinate: $event[1]
            })
        );
    }

    protected onEnvelopeCoordinateDeleted($event: [WnbEnvelope, WnbEnvelopeCoordinate]) {
        this.appStore.dispatch(
            AircraftWnbActions.deleteEnvelopeCoordinate({
                envelope: $event[0],
                coordinate: $event[1]
            })
        );
    }
}
