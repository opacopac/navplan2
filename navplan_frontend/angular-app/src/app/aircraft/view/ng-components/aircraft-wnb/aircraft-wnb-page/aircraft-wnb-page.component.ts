import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../../state/ngrx/aircraft.selectors';
import {
    getVolumeUnit,
    getWeightUnit,
    getWnbLengthUnit
} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Weight} from '../../../../../geo-physics/domain/model/quantities/weight';
import {AircraftWnbActions} from '../../../../state/ngrx/aircraft-wnb.actions';
import {WeightItem} from '../../../../domain/model/weight-item';
import {AircraftCrudActions} from '../../../../state/ngrx/aircraft-crud.actions';
import {WnbLonEnvelopeCoordinate} from '../../../../domain/model/wnb-lon-envelope-coordinate';
import {WnbEnvelope} from '../../../../domain/model/wnb-envelope';


@Component({
    selector: 'app-aircraft-wnb-page',
    templateUrl: './aircraft-wnb-page.component.html',
    styleUrls: ['./aircraft-wnb-page.component.scss'],
})
export class AircraftWnbPageComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly vehicleType$ = this.currentAircraft$.pipe(select(aircraft => aircraft.vehicleType));
    protected readonly wnbWeightItems$ = this.currentAircraft$.pipe(select(aircraft => aircraft.wnbWeightItems));
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


    protected onEnvelopeAdded($event: WnbEnvelope) {
        this.appStore.dispatch(
            AircraftWnbActions.addEnvelope({envelope: $event})
        );
    }


    protected onEnvelopeUpdated($event: [WnbEnvelope, WnbEnvelope]) {
        this.appStore.dispatch(
            AircraftWnbActions.updateEnvelope({
                oldEnvelope: $event[0],
                newEnvelope: $event[1]
            })
        );
    }

    protected onEnvelopeDeleted($event: WnbEnvelope) {
        this.appStore.dispatch(
            AircraftWnbActions.deleteEnvelope({envelope: $event})
        );
    }


    protected onEnvelopeCoordinateAdded($event: [WnbEnvelope, WnbLonEnvelopeCoordinate, number]) {
        this.appStore.dispatch(
            AircraftWnbActions.addEnvelopeCoordinate({
                envelope: $event[0],
                coordinate: $event[1],
                insertAtIndex: $event[2]
            })
        );
    }

    protected onEnvelopeCoordinateUpdated($event: [WnbEnvelope, WnbLonEnvelopeCoordinate, WnbLonEnvelopeCoordinate]) {
        this.appStore.dispatch(
            AircraftWnbActions.updateEnvelopeCoordinate({
                envelope: $event[0],
                oldCoordinate: $event[1],
                newCoordinate: $event[2]
            })
        );
    }

    protected onEnvelopeCoordinateDeleted($event: [WnbEnvelope, WnbLonEnvelopeCoordinate]) {
        this.appStore.dispatch(
            AircraftWnbActions.deleteEnvelopeCoordinate({
                envelope: $event[0],
                coordinate: $event[1]
            })
        );
    }


    protected onSaveAircraftWnb() {
        this.appStore.dispatch(
            AircraftCrudActions.saveAircraft()
        );
    }
}
