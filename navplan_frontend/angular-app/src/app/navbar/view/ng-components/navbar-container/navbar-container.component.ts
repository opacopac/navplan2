import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '../../../../user/state/ngrx/user.selectors';
import {ExporterActions} from '../../../../exporter/state/ngrx/exporter.actions';
import {ClearDialogComponent} from '../clear-dialog/clear-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LogoutActions} from '../../../../user/state/ngrx/logout.actions';
import {getCurrentAircraft} from '../../../../aircraft/state/ngrx/aircraft.selectors';


@Component({
    selector: 'app-navbar-container',
    templateUrl: './navbar-container.component.html',
    styleUrls: ['./navbar-container.component.scss']
})
export class NavbarContainerComponent implements OnInit {
    public readonly currentUser$ = this.appStore.pipe(select(getCurrentUser));
    public readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));


    constructor(
        private appStore: Store<any>,
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }


    public onLogoffClick() {
        this.appStore.dispatch(LogoutActions.userLogout());
    }


    public onExportPdfClick() {
        this.appStore.dispatch(ExporterActions.exportPdf());
    }


    public onExportExcelClick() {
        this.appStore.dispatch(ExporterActions.exportExcel());
    }


    public onExportKmlClick() {
        this.appStore.dispatch(ExporterActions.exportKml());
    }


    public onExportGpxClick() {
        this.appStore.dispatch(ExporterActions.exportGpx());
    }


    public onExportFplClick() {
        this.appStore.dispatch(ExporterActions.exportFpl());
    }


    public openClearDialog() {
        this.dialog.open(ClearDialogComponent);
    }
}
