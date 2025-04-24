import {Component, OnInit} from '@angular/core';
import {MiniImageViewerComponent} from '../../../../common/view/ng-components/mini-image-viewer/mini-image-viewer.component';


@Component({
    selector: 'app-about-page',
    standalone: true,
    imports: [
        MiniImageViewerComponent
    ],
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
    }
}
