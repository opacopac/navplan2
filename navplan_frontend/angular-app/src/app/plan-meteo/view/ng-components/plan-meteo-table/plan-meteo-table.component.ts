import {Component, Input, OnInit} from '@angular/core';
import {RouteMetarTaf} from '../../../domain/model/route-metar-taf';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {MatTableModule} from '@angular/material/table';
import {MapPopupMetarTafComponent} from '../../../../metar-taf/view/ng-components/map-popup-metar-taf/map-popup-metar-taf.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-plan-meteo-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MapPopupMetarTafComponent
    ],
    templateUrl: './plan-meteo-table.component.html',
    styleUrls: ['./plan-meteo-table.component.scss']
})
export class PlanMeteoTableComponent implements OnInit {
    @Input() public routeMetarTafList: RouteMetarTaf[];
    @Input() public showDistance: boolean;
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
