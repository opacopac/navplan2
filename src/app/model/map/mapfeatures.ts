import * as ol from 'openlayers';
import { MapItemModel, MapItemOlFeature } from './map-item-model';
import { Navaid, NavaidOlFeature, NavaidRestItem } from './navaid';
import { Airport, AirportOlFeature, AirportRestItem } from './airport';
import { Airspace, AirspaceOlFeature, AirspaceRestItem } from './airspace';
import { Reportingpoint, ReportingPointOlFeature, ReportingPointRestItem } from './reportingpoint';
import { Reportingsector, ReportingSectorOlFeature } from './reportingsector';
import { Userpoint, UserpointOlFeature, UserPointRestItem } from './userpoint';
import { Webcam, WebcamOlFeature, WebcamRestItem } from './webcam';


export interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceRestItem[];
    reportingPoints: ReportingPointRestItem[];
    userPoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
}


export class Mapfeatures implements MapItemModel {
    public navaids: Navaid[];
    public airports: Airport[];
    public airspaces: Airspace[];
    public reportingpoints: Reportingpoint[];
    public reportingsectors: Reportingsector[];
    public userpoints: Userpoint[];
    public webcams: Webcam[];


    constructor(restItem: MapFeaturesResponse) {
        // navaids
        this.navaids = [];
        for (const subRestItem of restItem.navaids) {
            this.navaids.push(new Navaid(subRestItem));
        }

        // airports
        this.airports = [];
        for (const subRestItem of restItem.airports) {
            this.airports.push(new Airport(subRestItem));
        }

        // airspaces
        this.airspaces = [];
        for (const key in restItem.airspaces) {
            this.airspaces.push(new Airspace(restItem.airspaces[key]));
        }

        // reporting points
        this.reportingpoints = [];
        this.reportingsectors = [];
        for (const subRestItem of restItem.reportingPoints) {
            switch (subRestItem.type) {
                case 'POINT':
                    this.reportingpoints.push(new Reportingpoint(subRestItem));
                    break;
                case 'SECTOR':
                    this.reportingsectors.push(new Reportingsector(subRestItem));
                    break;
            }
        }

        // user points
        this.userpoints = [];
        for (const subRestItem of restItem.userPoints) {
            this.userpoints.push(new Userpoint(subRestItem));
        }

        // webcams
        this.webcams = [];
        for (const subRestItem of restItem.webcams) {
            this.webcams.push(new Webcam(subRestItem));
        }
    }


    public getGeometryType() {
        return undefined;
    }


    public getGeometry() {
        return undefined;
    }
}


export class MapfeaturesOlFeature extends MapItemOlFeature {
    public mapItemModel: Mapfeatures;


    public constructor(mapfeatures: Mapfeatures) {
        super(mapfeatures);
    }


    public draw(source: ol.source.Vector) {
        // navaids
        for (const navaid of this.mapItemModel.navaids) {
            const olFeature = new NavaidOlFeature(navaid);
            olFeature.draw(source);
        }

        // airports
        for (const airport of this.mapItemModel.airports) {
            const olFeature = new AirportOlFeature(airport);
            olFeature.draw(source);
        }

        // airspaces
        for (const airspace of this.mapItemModel.airspaces) {
            const olFeature = new AirspaceOlFeature(airspace);
            olFeature.draw(source);
        }

        // reporting points
        for (const repPoint of this.mapItemModel.reportingpoints) {
            const olFeature = new ReportingPointOlFeature(repPoint);
            olFeature.draw(source);
        }

        // reporting sector
        for (const repSec of this.mapItemModel.reportingsectors) {
            const olFeature = new ReportingSectorOlFeature(repSec);
            olFeature.draw(source);
        }

        // user points
        for (const userPoint of this.mapItemModel.userpoints) {
            const olFeature = new UserpointOlFeature(userPoint);
            olFeature.draw(source);
        }

        // webcams
        for (const webcam of this.mapItemModel.webcams) {
            const olFeature = new WebcamOlFeature(webcam);
            olFeature.draw(source);
        }
    }


    public createOlStyle() {
        return undefined;
    }
}
