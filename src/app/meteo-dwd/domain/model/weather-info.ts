import {DataItem, DataItemType} from '../../../common/model/data-item';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';


export class WeatherInfo extends DataItem {
    public constructor(
        public wwValue: number,
        public ceiling: Altitude
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.dwdWwForecast;
    }


    public getWwText(): string {
        switch (this.wwValue) {
            case 0: return 'SKC';
            case 1: return 'FEW';
            case 2: return 'BKN';
            case 3: return 'OVC';
            case 45: return 'FG';
            case 48: return 'FZFG';
            case 51: return '-DZ';
            case 53: return 'DZ';
            case 55: return '+DZ';
            case 56: return '-FZDZ';
            case 57: return 'FZDZ';
            case 61: return '-RA';
            case 63: return 'RA';
            case 65: return '+RA';
            case 66: return '-FZRA';
            case 67: return 'FZRA';
            case 71: return '-SN';
            case 73: return 'SN';
            case 75: return '+SN';
            case 77: return 'SG';
            case 80: return '-SHRA';
            case 81: return 'SHRA';
            case 82: return '+SHRA';
            case 85: return '-SHSN';
            case 86: return 'SHSN';
            case 95: return 'TSRA';
            case 96: return 'TSGR';
            case 99: return '+TSRA';
            default: return 'UNKNOWN'; // TODO
        }
    }
}
