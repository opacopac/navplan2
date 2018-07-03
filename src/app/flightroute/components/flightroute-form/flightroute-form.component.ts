import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ButtonColor, ButtonSize} from '../../../components/buttons/button-base.directive';
import {Flightroute} from '../../model/flightroute';
import {FlightrouteListEntry} from '../../../model/flightroute/flightroute-list-entry';
import {User} from '../../../user/model/user';
import {Speed} from '../../../model/quantities/speed';
import {Consumption} from '../../../model/quantities/consumption';
import {ConsumptionUnit, SpeedUnit} from '../../../services/utils/unitconversion.service';
import {Waypoint} from '../../model/waypoint';


@Component({
    selector: 'app-flightroute-form',
    templateUrl: './flightroute-form.component.html',
    styleUrls: ['./flightroute-form.component.css']
})
export class FlightrouteFormComponent implements OnInit {
    @Input() currentUser: User;
    @Input() flightrouteList: FlightrouteListEntry[];
    @Output() onLoadFlightrouteClicked = new EventEmitter<string>();
    @Output() onSaveFlightrouteClicked = new EventEmitter<string>();
    @Output() onSaveFlightrouteCopyClicked = new EventEmitter<null>();
    @Output() onDeleteFlightrouteClicked = new EventEmitter<string>();
    @Output() onUpdateRouteName = new EventEmitter<string>();
    @Output() onUpdateRouteComments = new EventEmitter<string>();
    @Output() onUpdateAircraftSpeed = new EventEmitter<string>();
    @Output() onUpdateAircraftConsumption = new EventEmitter<string>();
    @Output() onUpdateExtraTime = new EventEmitter<string>();
    @Output() onEditWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onRemoveWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onReverseWaypointsClicked = new EventEmitter<null>();
    public _flightroute: Flightroute;
    public flightrouteForm: FormGroup;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(private formBuilder: FormBuilder) {
        this.initForm();
    }


    @Input() set flightroute(value: Flightroute) {
        this._flightroute = value;
        if (value) {
            this.setFormValues(
                value.id,
                value.title,
                value.aircraft.speed,
                value.aircraft.consumption,
                value.comments);
        } else {
            this.setFormValues(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined);
        }
    }


    ngOnInit() {
    }


    private initForm() {
        this.flightrouteForm = this.formBuilder.group({
            'flightrouteId': -1,
            'flightrouteName': ['', Validators.maxLength(50)],
            'aircraftSpeed': ['', [Validators.required, Validators.maxLength(3)]],
            'aircraftConsumption': ['', [Validators.required, Validators.maxLength(2)]],
            'flightrouteComments': ['', [Validators.maxLength(2048)]]
        });
    }


    private setFormValues(id: number, title: string, speed: Speed, consumption: Consumption, comments: string) {
        this.flightrouteForm.setValue({
            'flightrouteId': id ? id : -1,
            'flightrouteName': title ? title : '',
            'aircraftSpeed': speed ? speed.getValue(SpeedUnit.KT) : '', // TODO
            'aircraftConsumption': consumption ? consumption.getValue(ConsumptionUnit.L_PER_H) : '', // TODO
            'flightrouteComments': comments ? comments : ''
        });
    }
}
