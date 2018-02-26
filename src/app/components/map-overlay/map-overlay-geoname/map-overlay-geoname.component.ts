import { Component, OnInit } from '@angular/core';
import { Geoname } from '../../../model/geoname';
import { MapOverlayContent } from '../map-overlay-content';
import { UnitconversionService } from '../../../services/utils/unitconversion.service';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-geoname',
    templateUrl: './map-overlay-geoname.component.html',
    styleUrls: ['./map-overlay-geoname.component.css']
})
export class MapOverlayGeonameComponent implements OnInit, MapOverlayContent {
    public geoname: Geoname;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(geoname: Geoname) {
        this.geoname = geoname;
    }


    public getTitle(): string {
        return 'Geolocation';
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.geoname.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.geoname.position.getLonLat());
    }



    public getElevationString() {
        return Math.round(UnitconversionService.m2ft(this.geoname.elevation_m)) + 'ft';
    }
}
