import {Component, Input, OnInit} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-mini-image-viewer',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule
    ],
    templateUrl: './mini-image-viewer.component.html',
    styleUrls: ['./mini-image-viewer.component.scss']
})
export class MiniImageViewerComponent implements OnInit {
    @Input() public imageSrc;

    protected scale = 1;


    constructor() {
    }


    ngOnInit() {
    }


    protected zoomIn() {
        this.scale *= 1.2;
    }


    protected zoomOut() {
        this.scale /= 1.2;
    }
}
