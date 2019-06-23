export interface IRestMetarTafProperties {
    id: string;
    site: string;
    prior: string; // TODO?
    obsTime: string;
    temp: number;
    dewp: number;
    wspd: number;
    wdir: number;
    ceil: number;
    cover: string;
    wx: string;
    visib: number;
    fltcat: string;
    altim: number;
    rawOb: string;
    rawTaf: string;
}
