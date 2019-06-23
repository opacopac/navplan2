import {IRestTrafficAddress} from '../i-rest-traffic-address';


export interface IRestTrafficDetails {
    'addr': IRestTrafficAddress;
    'reg': string;
    'model': string;
    'manufacturer': string;
    'ac_type': string; // 4-characters
    'ac_class': string; // A=Amphibian, G=Gyrocopter, H=Helicopter, L=Landplane, S=Seaplane, T=Tiltrotor
    'eng_class': string; // E=Electric, J=Jet, P=Piston, R=Rocket, T=Turboprop
}
