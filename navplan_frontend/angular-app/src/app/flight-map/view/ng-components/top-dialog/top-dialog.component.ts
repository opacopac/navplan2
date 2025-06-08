import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-top-dialog',
    imports: [
        CommonModule,
        MatButtonModule
    ],
    templateUrl: './top-dialog.component.html',
    styleUrls: ['./top-dialog.component.scss']
})
export class TopDialogComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
    }


    protected toggleDrawer() {
        console.log('MEEP');
    }
}
