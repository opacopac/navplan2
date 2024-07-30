import {Component, Input, OnInit} from '@angular/core';
import {RouteMetarTaf} from '../../../../domain/model/route-metar-taf';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';


@Component({
    selector: 'app-route-meteo-table',
    templateUrl: './route-meteo-table.component.html',
    styleUrls: ['./route-meteo-table.component.scss']
})
export class RouteMeteoTableComponent implements OnInit {
    @Input() public routeMetarTafList: RouteMetarTaf[];
    @Input() public showDistance: boolean;
    @Input() public noDataText: string;
    @Input() public distanceUnit: LengthUnit;


    constructor() {
    }


    ngOnInit(): void {
    }


    public getColumnKeys(): string[] {
        return this.showDistance ? ['site', 'dist', 'metartaf'] : ['site', 'metartaf'];
    }


    public getDistanceText(routeMetarTaf: RouteMetarTaf): string {
        const value = Math.round(routeMetarTaf.distance.getValue(this.distanceUnit));
        const unit = Length.getUnitString(this.distanceUnit);

        return value + ' ' + unit;
    }
}
