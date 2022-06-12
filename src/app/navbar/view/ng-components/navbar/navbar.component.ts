import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../user/domain/model/user';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() currentUser: User;
    @Output() onShowSearchClick: EventEmitter<null> = new EventEmitter<null>();
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
}
