import $ from 'jquery';
import 'rxjs/add/operator/withLatestFrom';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {SessionService} from '../../services/session/session.service';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {Waypoint2} from '../../model/flightroute/waypoint2';
import {Observable} from 'rxjs/Observable';
declare var $: $; // wtf? --> https://github.com/dougludlow/ng2-bs3-modal/issues/147


@Component({
    selector: 'app-editwaypoint',
    templateUrl: './editwaypoint.component.html',
    styleUrls: ['./editwaypoint.component.css']
})
export class EditwaypointComponent implements OnInit, OnDestroy {
    @ViewChild('container') container: HTMLElement;
    public session: Sessioncontext;
    public editWpForm: FormGroup;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    private editWaypointActiveSubscription: Subscription;
    private selectedWaypointSubscription: Subscription;


    constructor(
        public formBuilder: FormBuilder,
        public sessionService: SessionService) {

        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
        this.initForm();
        this.editWaypointActiveSubscription = this.session.editWaypointActive$
            .subscribe((editActive) => {
                if (editActive) {
                    this.showForm();
                } else {
                    this.hideForm();
                }
            });
        this.selectedWaypointSubscription = this.session.selectedWaypoint$
            .subscribe((selectedWaypoint) => {
                this.updateFormValues(selectedWaypoint);
            });
    }


    ngOnDestroy() {
        this.editWaypointActiveSubscription.unsubscribe();
        this.selectedWaypointSubscription.unsubscribe();
    }


    public onSaveClicked() {
        if (this.editWpForm.valid) {
            this.updateSelectedWaypoint();
            this.session.selectedWaypoint = undefined;
            this.session.editWaypointActive = false;
        }
    }


    public onCancelClicked() {
        this.session.selectedWaypoint = undefined;
        this.session.editWaypointActive = false;
    }


    public onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    public onSetIsAltAtLegStartClicked(value: boolean) {
        this.editWpForm.patchValue({'isaltatlegstart': value});
        this.editWpForm.patchValue({'isaltatlegend': !value});
    }


    private showForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('show');
        }, 10);
    }


    private hideForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('hide');
        }, 10);
    }


    private updateFormValues(waypoint: Waypoint2) {
        if (!waypoint) { return; }
        Observable.combineLatest(
            waypoint.checkpoint$,
            waypoint.freq$,
            waypoint.callsign$,
            waypoint.alt.alt_ft$,
            waypoint.alt.ismaxalt$,
            waypoint.alt.isminalt$,
            waypoint.alt.isaltatlegstart$,
            waypoint.remark$,
            waypoint.supp_info$)
            .first()
            .subscribe(([checkpoint, freq, callsign, alt_ft, ismaxalt, isminalt, isaltatlegstart, remark, supp_info]) => {
                this.setFormValues(checkpoint, freq, callsign, Number(alt_ft), Boolean(ismaxalt), Boolean(isminalt), Boolean(isaltatlegstart), remark, supp_info);
            });
    }


    private updateSelectedWaypoint() {
        const formValues = this.editWpForm.value;
        this.session.selectedWaypoint$
            .first()
            .subscribe((waypoint) => {
                waypoint.checkpoint = formValues.checkpoint;
                waypoint.freq = formValues.freq;
                waypoint.callsign = formValues.callsign;
                waypoint.alt.alt_ft = isNaN(formValues.alt) ? undefined : formValues.alt;
                waypoint.alt.isminalt = formValues.isminalt;
                waypoint.alt.ismaxalt = formValues.ismaxalt;
                waypoint.alt.isaltatlegstart = formValues.isaltatlegstart;
                waypoint.remark = formValues.remark;
                waypoint.supp_info = formValues.supp_info;
            });
    }


    private initForm() {
        this.editWpForm = this.formBuilder.group({
            'checkpoint': ['', [Validators.required, Validators.maxLength(30)]],
            'freq': ['', Validators.maxLength(7)],
            'callsign': ['', Validators.maxLength(10)],
            'alt': ['', [Validators.maxLength(5), Validators.min(0), Validators.max(99999)]],
            'isminalt': false,
            'ismaxalt': false,
            'isaltatlegstart': false,
            'isaltatlegend': true,
            'remark': ['', Validators.maxLength(50)],
            'supp_info': ['', Validators.maxLength(255)]
        });
    }


    private setFormValues(checkpoint: string, freq: string, callsign: string, alt_ft: number, ismaxalt: boolean, isminalt: boolean, isaltatlegstart: boolean, remark: string, supp_info: string) {
        this.editWpForm.setValue({
            'checkpoint': checkpoint,
            'freq': freq,
            'callsign': callsign,
            'alt': alt_ft ? alt_ft : '',
            'isminalt': isminalt,
            'ismaxalt': ismaxalt,
            'isaltatlegstart': isaltatlegstart,
            'isaltatlegend': !isaltatlegstart,
            'remark': remark,
            'supp_info': supp_info
        });
    }
}
