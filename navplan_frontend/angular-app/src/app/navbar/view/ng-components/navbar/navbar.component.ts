import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from '../../../../user/domain/model/user';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';
import {environment} from '../../../../../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        RouterModule,
        MatButtonModule,
        MatMenuModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {
    @Input() currentUser: User;
    @Input() currentAircraft: Aircraft;
    @Input() selectedAircraftTab: string;
    @Input() selectedTrackTab: string;
    @Input() selectedRouteTab: string;
    @Output() onLogoffClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportPdfClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportExcelClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportKmlClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportGpxClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportFplClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onClearClick: EventEmitter<null> = new EventEmitter<null>();

    protected logoUrl = environment.iconBaseUrl + 'traffic_plane.svg';


    constructor() {
    }


    ngOnInit() {
    }


    ngOnChanges() {
    }


    protected getAircraftText(): string {
        return this.currentAircraft ? this.currentAircraft.registration : 'Aircraft';
    }


    protected getFlightrouteRouterLink(): string {
        return this.selectedRouteTab
            ? './plan/' + this.selectedRouteTab
            : './plan';
    }


    protected getAircraftRouterLink(): string {
        return this.selectedAircraftTab
            ? './aircraft/' + this.selectedAircraftTab
            : './aircraft';
    }


    protected getTrackRouterLink(): string {
        return this.selectedTrackTab
            ? './track/' + this.selectedTrackTab
            : './track';
    }
}
