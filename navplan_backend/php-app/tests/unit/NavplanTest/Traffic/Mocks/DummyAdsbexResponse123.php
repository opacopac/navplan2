<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;


class DummyAdsbexResponse123 {
    public static function create(): array {
        return [
            DummyAdsbexTraffic1::create(),
            DummyAdsbexTraffic2::create(),
            DummyAdsbexTraffic3::create()
        ];
    }


    public static function createAdsbexResponse(): string {
        return '{
            "ac": [
               {
                    "postime": "1560000429704",
                    "icao": "4B3145",
                    "reg": "HB-SRD",
                    "type": "AAT3",
                    "wtc": "1",
                    "spdtyp": "",
                    "spd": "",
                    "altt": "0",
                    "alt": "3375",
                    "galt": "3375",
                    "talt": "",
                    "lat": "46.8340001",
                    "lon": "7.5765005",
                    "vsit": "0",
                    "vsi": "",
                    "trkh": "0",
                    "ttrk": "",
                    "trak": "",
                    "sqk": "",
                    "call": "HBSRD",
                    "gnd": "0",
                    "trt": "1",
                    "pos": "1",
                    "mlat": "1",
                    "tisb": "0",
                    "sat": "0",
                    "opicao": "",
                    "cou": "Switzerland",
                    "mil": "0",
                    "interested": "0"
                }, {
                    "postime": "1560000515263",
                    "icao": "4B2928",
                    "reg": "HB-PPG",
                    "type": "P28A",
                    "wtc": "1",
                    "spdtyp": "",
                    "spd": "",
                    "altt": "0",
                    "alt": "4150",
                    "galt": "4150",
                    "talt": "",
                    "lat": "47.1468",
                    "lon": "7.2636",
                    "vsit": "0",
                    "vsi": "",
                    "trkh": "0",
                    "ttrk": "",
                    "trak": "305",
                    "sqk": "7000",
                    "call": "HBPPG",
                    "gnd": "0",
                    "trt": "1",
                    "pos": "1",
                    "mlat": "1",
                    "tisb": "0",
                    "sat": "0",
                    "opicao": "",
                    "cou": "Switzerland",
                    "mil": "0",
                    "interested": "0"
                }, {
                    "postime": "1560000518739",
			        "icao": "4BAA8F",
                    "reg": "TC-JTO",
                    "type": "A321",
                    "wtc": "2",
                    "spdtyp": "",
                    "spd": "499",
                    "altt": "0",
                    "alt": "24275",
                    "galt": "24263",
                    "talt": "28000",
                    "lat": "46.645947",
                    "lon": "7.100327",
                    "vsit": "1",
                    "vsi": "1152",
                    "trkh": "0",
                    "ttrk": "180",
                    "trak": "51.6",
                    "sqk": "5703",
                    "call": "THY4PF",
                    "gnd": "0",
                    "trt": "5",
                    "pos": "1",
                    "mlat": "0",
                    "tisb": "0",
                    "sat": "0",
                    "opicao": "THY",
                    "cou": "Turkey",
                    "mil": "0",
                    "interested": "0",
                    "from": "LEBL Barcelona, Spain",
                    "to": "LTFJ Sabiha G\u00f6k\u00e7en, Istanbul, Turkey"
                }
            ],
            "total": 43,
            "ctime": 1560000523926,
            "ptime": 356
        }';
    }
}
