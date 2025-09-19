export interface IRestMetarTafEntry {
    icaoId: string;
    obsTime: string;
    wspd: number;
    wdir: number;
    cover: string;
    wxString: string;
    lat: number;
    lon: number;
    rawOb: string;
    rawTaf: string;
}
