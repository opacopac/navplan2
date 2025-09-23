import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MeteoForecastPickerListComponent} from '../meteo-forecast-picker-list/meteo-forecast-picker-list.component';
import {ForecastRun} from '../../../domain/model/forecast-run';


@Component({
    selector: 'app-meteo-forecast-picker-dialog',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MeteoForecastPickerListComponent,
    ],
    templateUrl: './meteo-forecast-picker-dialog.component.html',
    styleUrls: ['./meteo-forecast-picker-dialog.component.scss']
})
export class MeteoForecastPickerDialogComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<MeteoForecastPickerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            forecastRunList$: Observable<ForecastRun[]>,
            currentForecastRun$: Observable<ForecastRun>
        }
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    protected onSelectClick(forecastRun: ForecastRun) {
        this.dialogRef.close(forecastRun);
    }


    protected onCancelClick() {
        this.dialogRef.close();
    }
}
