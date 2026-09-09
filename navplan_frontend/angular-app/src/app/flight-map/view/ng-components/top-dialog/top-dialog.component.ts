import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-top-dialog',
    imports: [
    MatButtonModule
],
    templateUrl: './top-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
