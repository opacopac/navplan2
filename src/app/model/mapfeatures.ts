import { Navaid } from './navaid';
import { Airport } from './airport';
import { Airspace } from './airspace';
import { Reportingpoint } from './reportingpoint';
import { Reportingsector } from './reportingsector';
import { Userpoint } from './userpoint';
import { Webcam } from './webcam';


export class Mapfeatures {
    public navaids: Navaid[];
    public airports: Airport[];
    public airspaces: Airspace[];
    public reportingpoints: Reportingpoint[];
    public reportingsectors: Reportingsector[];
    public userpoints: Userpoint[];
    public webcams: Webcam[];

    constructor() {
        this.navaids = [];
        this.airports = [];
        this.airspaces = [];
        this.reportingpoints = [];
        this.reportingsectors = [];
        this.userpoints = [];
        this.webcams = [];
    }
}
