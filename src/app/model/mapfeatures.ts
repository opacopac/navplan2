import { Navaid, NavaidRestItem } from './navaid';
import { Airport, AirportRestItem } from './airport';
import { Airspace, AirspaceRestItem } from './airspace';
import { Reportingpoint, ReportingPointRestItem } from './reportingpoint';
import { Reportingsector } from './reportingsector';
import { Userpoint, UserPointRestItem } from './userpoint';
import { Webcam, WebcamRestItem } from './webcam';


export interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceRestItem[];
    reportingPoints: ReportingPointRestItem[];
    userPoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
}


export class Mapfeatures {
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
}
