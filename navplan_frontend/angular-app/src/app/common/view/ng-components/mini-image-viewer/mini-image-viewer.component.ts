import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    @Input() public isClickable = false;
    @Output() public imageClicked = new EventEmitter<{ x: number, y: number }>();

    protected scale = 1;


    constructor() {
    }


    ngOnInit() {
    }


    protected getImageStyle(): {[p: string]: any} | null | undefined {
        return {
            'transform' : 'scale(' + this.scale + ')',
            'cursor' : this.isClickable ? 'crosshair' : 'auto',
        };
    }


    protected zoomIn() {
        this.scale *= 1.2;
    }


    protected zoomOut() {
        this.scale /= 1.2;
    }


    protected onImageClicked(event: MouseEvent) {
        if (!this.isClickable) {
            return;
        }

        const imgElement = event.target as HTMLImageElement;
        const rect = imgElement.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        const adjustedX = clickX / this.scale;
        const adjustedY = clickY / this.scale;

        this.imageClicked.emit({x: adjustedX, y: adjustedY});
    }
}
