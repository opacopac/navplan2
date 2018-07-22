import { Navaid } from './navaid';
import { Airport } from './airport';
import { Airspace } from './airspace';
import { Reportingpoint } from './reportingpoint';
import { Reportingsector } from './reportingsector';
import { Userpoint } from './userpoint';
import { Webcam } from './webcam';
import {DataItem, DataItemType} from '../../shared/model/data-item';


export class Mapfeatures extends DataItem {
    public navaids: Navaid[];
    public airports: Airport[];
    public airspaces: Airspace[];
    public reportingpoints: Reportingpoint[];
    public reportingsectors: Reportingsector[];
    public userpoints: Userpoint[];
    public webcams: Webcam[];
    private airportIcaoLookup: Airport[];


    constructor() {
        super();

        this.navaids = [];
        this.airports = [];
        this.airspaces = [];
        this.reportingpoints = [];
        this.reportingsectors = [];
        this.userpoints = [];
        this.webcams = [];
    }


    public get dataItemType(): DataItemType {
        return DataItemType.mapFeatures;
    }


    public getAirportByIcao(icao: string): Airport {
        if (!this.airportIcaoLookup) {
            this.createAirportIcaoLookup();
        }

        return this.airportIcaoLookup[icao];
    }


    private createAirportIcaoLookup() {
        this.airportIcaoLookup = [];
        for (let i = 0; i < this.airports.length; i++) {
            const ad = this.airports[i];
            this.airportIcaoLookup[ad.icao] = ad;
        }
    }
}
