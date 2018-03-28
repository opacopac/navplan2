import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { UnitconversionService } from '../../../services/utils/unitconversion.service';
import { Airport, AirportRunway, AirportType } from '../../../model/airport';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';
import { Waypoint } from '../../../model/waypoint';


@Component({
    selector: 'app-map-overlay-airport',
    templateUrl: './map-overlay-airport.component.html',
    styleUrls: ['./map-overlay-airport.component.css']
})
export class MapOverlayAirportComponent implements OnInit, MapOverlayContent {
    public airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(airport: Airport) {
        this.airport = airport;
    }


    public getTitle(): string {
        switch (this.airport.type) {
            case AirportType.AD_CLOSED : return 'Closed Aerodrome';
            case AirportType.AD_MIL : return 'Military Aerodrome';
            case AirportType.AF_CIVIL : return 'Civil Airfield';
            case AirportType.AF_MIL_CIVIL : return 'Airfield (civil/military)';
            case AirportType.AF_WATER : return 'Water Airfield';
            case AirportType.APT : return 'Airport resp. Airfield IFR';
            case AirportType.GLIDING : return 'Glider Site';
            case AirportType.HELI_CIVIL : return 'Civil Heliport';
            case AirportType.HELI_MIL : return 'Military Heliport';
            case AirportType.INTL_APT : return 'International Airport';
            case AirportType.LIGHT_AIRCRAFT : return 'Ultra Light Flying Site';
            default : return 'Unknown';
        }
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.airport.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.airport.position.getLonLat());
    }


    public getElevationString(): string {
        return Math.round(UnitconversionService.m2ft(this.airport.elevation_m)) + 'ft';
    }


    public getDimensionsString(runway: AirportRunway): string {
        return Math.round(runway.length) + ' x ' + Math.round(runway.width) + 'm';
    }


    public onToggleElementClicked(elementId: string) {
        $(elementId).toggle();
    }
}
