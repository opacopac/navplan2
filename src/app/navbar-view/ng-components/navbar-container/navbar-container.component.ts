import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../user/domain-model/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '../../../user-state/ngrx/user.selectors';
import {SearchActions} from '../../../search-state/ngrx/search.actions';
import {LogoutUserAction} from '../../../user-state/ngrx/user.actions';
import {ExporterActions} from '../../../exporter-state/ngrx/exporter.actions';


@Component({
    selector: 'app-navbar-container',
    templateUrl: './navbar-container.component.html',
    styleUrls: ['./navbar-container.component.css']
})
export class NavbarContainerComponent implements OnInit {
    public readonly currentUser$: Observable<User>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
    }


    ngOnInit() {
    }


    public onShowSearchClick() {
        this.appStore.dispatch(SearchActions.showTextSearchField());
    }


    public onLogoffClick() {
        this.appStore.dispatch(new LogoutUserAction());
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
}
