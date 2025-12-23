import {IRestNotamGeometry} from './i-rest-notam-geometry';


export interface IRestNotam {
    id: number;
    statecode: string;
    statename: string;
    notamid: string;
    entity: string;
    status: string;
    qcode: string;
    area: string;
    subarea: string;
    condition: string;
    subject: string;
    modifier: string;
    message: string;
    startdate: string;
    enddate: string;
    all: string;
    locationicao: string;
    locationname: string;
    isicaoformat: boolean;
    created: string;
    key: string;
    type: string;
    geometry: IRestNotamGeometry;
}
