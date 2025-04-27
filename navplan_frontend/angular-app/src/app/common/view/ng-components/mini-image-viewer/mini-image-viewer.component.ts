import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';


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
    @Output() public imageClicked = new EventEmitter<XyCoord>();
    @ViewChild('imgContainer') imgContainer: ElementRef;

    protected naturalWidth = 0;
    protected naturalHeight = 0;
    protected scale = 1;


    constructor() {
    }


    ngOnInit() {
    }


    protected onImageLoad(event: Event) {
        const img = event.target as HTMLImageElement;
        this.naturalWidth = img.naturalWidth;
        this.naturalHeight = img.naturalHeight;
        this.fitImageToContainer();
    }


    protected getImageStyle(): { [p: string]: any } | null | undefined {
        return {
            'cursor': this.isClickable ? 'crosshair' : 'auto',
        };
    }


    protected zoomIn() {
        this.scale *= 1.2;
    }


    protected zoomOut() {
        this.scale /= 1.2;
    }


    protected fitImageToContainer() {
        if (!this.imgContainer) {
            return;
        }

        const imgContainerElement = this.imgContainer.nativeElement;

        const containerWidth = imgContainerElement.clientWidth;
        const containerHeight = imgContainerElement.clientHeight;

        const widthRatio = containerWidth / this.naturalWidth;
        const heightRatio = containerHeight / this.naturalHeight;

        this.scale = Math.min(widthRatio, heightRatio, 1); // don't upscale if image is smaller
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
        const coord = new XyCoord(adjustedX, adjustedY);

        this.imageClicked.emit(coord);
    }
}
