import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';
import {SvgCrosshairSvg} from '../../../svg/svg-crosshair-svg';


@Component({
    selector: 'app-mini-image-viewer',
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule
    ],
    templateUrl: './mini-image-viewer.component.html',
    standalone: true,
    styleUrls: ['./mini-image-viewer.component.scss']
})
export class MiniImageViewerComponent implements OnInit, OnChanges, AfterViewInit {
    private static readonly ZOOM_FACTOR = 1.2;

    @Input() public imageSrc;
    @Input() public isClickable = false;
    @Input() public fitImage = false;
    @Input() public overlayIcons: {
        id: number,
        xyCoord: XyCoord,
        icon: string,
        color: string
    }[] = [];
    @Output() public imageClicked = new EventEmitter<XyCoord>();
    @ViewChild('imgContainer') imgContainer: ElementRef;
    @ViewChild('crosshairContainer') crosshairContainer: ElementRef;

    protected naturalWidth = 0;
    protected naturalHeight = 0;
    protected scale = 1;
    protected centerOffsetPx = 17; // half of the crosshair icon size (34px)


    constructor() {
    }


    ngOnInit() {
    }


    ngAfterViewInit(): void {
        this.redrawCrossHairs();
    }


    ngOnChanges(): void {
        this.redrawCrossHairs();
    }


    protected onImageLoad(event: Event) {
        const img = event.target as HTMLImageElement;
        this.naturalWidth = img.naturalWidth;
        this.naturalHeight = img.naturalHeight;

        if (this.fitImage) {
            this.fitImageToContainer();
        }
    }


    protected getImageStyle(): { [p: string]: any } | null | undefined {
        return {
            'cursor': this.isClickable ? 'crosshair' : 'auto',
        };
    }


    protected redrawCrossHairs(): void {
        if (!this.crosshairContainer) {
            return;
        }

        this.crosshairContainer.nativeElement.innerHTML = '';

        if (this.overlayIcons) {
            for (const icon of this.overlayIcons) {
                const svg = SvgCrosshairSvg.create(icon.color);
                svg.style.position = 'absolute';
                svg.style.top = (icon.xyCoord.y * this.scale - this.centerOffsetPx) + 'px';
                svg.style.left = (icon.xyCoord.x * this.scale - this.centerOffsetPx) + 'px';

                this.crosshairContainer.nativeElement.appendChild(svg);
            }
        }
    }


    protected zoomIn() {
        const scrollPos = this.getScrollPos();
        this.scale *= MiniImageViewerComponent.ZOOM_FACTOR;
        this.setScrollPos({
            top: scrollPos.top * MiniImageViewerComponent.ZOOM_FACTOR,
            left: scrollPos.left * MiniImageViewerComponent.ZOOM_FACTOR
        });
    }


    protected zoomOut() {
        const scrollPos = this.getScrollPos();
        this.scale /= MiniImageViewerComponent.ZOOM_FACTOR;
        this.setScrollPos({
            top: scrollPos.top / MiniImageViewerComponent.ZOOM_FACTOR,
            left: scrollPos.left / MiniImageViewerComponent.ZOOM_FACTOR
        });
    }


    protected fitImageToContainer() {
        if (!this.imgContainer) {
            return;
        }

        const imgContainerElement = this.imgContainer.nativeElement;

        const containerWidth = imgContainerElement.clientWidth;
        const containerHeight = imgContainerElement.clientHeight;

        if (containerWidth === 0 || containerHeight === 0) {
            return;
        }

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


    private getScrollPos(): { top: number, left: number } {
        if (!this.imgContainer) {
            return {top: 0, left: 0};
        }

        const container = this.imgContainer.nativeElement;
        return {
            top: container.scrollTop,
            left: container.scrollLeft
        };
    }


    private setScrollPos(scrollPos: { top: number, left: number }) {
        if (!this.imgContainer) {
            return;
        }

        const container = this.imgContainer.nativeElement;
        container.scrollTop = scrollPos.top;
        container.scrollLeft = scrollPos.left;
    }
}
