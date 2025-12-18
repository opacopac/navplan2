import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Notam} from '../../../domain/model/notam';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {OlOverlayBaseComponent} from '../../../../base-map/view/ng-components/ol-overlay-base.component';
import {MatCardModule} from '@angular/material/card';
import {MapPopupNotamListComponent} from '../map-popup-notam-list/map-popup-notam-list.component';


@Component({
    selector: 'app-map-popup-notam',
    imports: [
        MatCardModule,
        MapPopupNotamListComponent
    ],
    templateUrl: './map-popup-notam.component.html',
    styleUrls: ['./map-popup-notam.component.scss']
})
export class MapPopupNotamComponent extends OlOverlayBaseComponent implements OnInit {
    public notam: Notam;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(notam: Notam, clickPos: Position2d) {
        this.notam = notam;
        this.setPosition(clickPos);
        this.markForCheck();
    }
}
