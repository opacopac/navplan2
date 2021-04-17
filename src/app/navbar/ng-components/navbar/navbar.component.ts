import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../user/domain-model/user';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() currentUser: User;
    @Output() onShowSearchClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() onLogoffClick: EventEmitter<null> = new EventEmitter<null>();


    constructor() {
    }


    ngOnInit() {
    }
}
