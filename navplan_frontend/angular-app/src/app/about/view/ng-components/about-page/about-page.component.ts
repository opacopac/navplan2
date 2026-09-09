import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';


@Component({
    selector: 'app-about-page',
    imports: [],
    templateUrl: './about-page.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
    }
}
