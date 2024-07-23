import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../user/domain/model/user';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @Input() currentUser: User;
    @Input() currentAircraft: Aircraft;
    @Output() onLogoffClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportPdfClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportExcelClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportKmlClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportGpxClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onExportFplClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onClearClick: EventEmitter<null> = new EventEmitter<null>();


    constructor() {
    }


    ngOnInit() {
    }


    protected getAircraftText(): string {
        return this.currentAircraft ? this.currentAircraft.registration : 'Aircraft';
    }
}
