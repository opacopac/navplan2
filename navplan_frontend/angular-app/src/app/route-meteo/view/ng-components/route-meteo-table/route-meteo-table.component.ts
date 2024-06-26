import {Component, Input, OnInit} from '@angular/core';
import {RouteMetarTaf} from '../../../domain/model/route-metar-taf';


@Component({
    selector: 'app-route-meteo-table',
    templateUrl: './route-meteo-table.component.html',
    styleUrls: ['./route-meteo-table.component.scss']
})
export class RouteMeteoTableComponent implements OnInit {
    @Input() public routeMetarTafList: RouteMetarTaf[];
    @Input() public showDistance: boolean;
    @Input() public noDataText: string;


    constructor() {
    }


    ngOnInit(): void {
    }


    public getColumnKeys(): string[] {
        return this.showDistance ? ['site', 'dist', 'metartaf'] : ['site', 'metartaf'];
    }


    public getDistanceText(routeMetarTaf: RouteMetarTaf): string {
        return Math.round(routeMetarTaf.distance.nm) + ' NM'; // TODO
    }
}
