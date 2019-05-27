<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Notam\Domain\Notam;

class DummyNotam2 {
    public static function create(): Notam {
        return new Notam(
            23947586,
            "USA",
            "United States of America",
            "!FDC 9\/0861",
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            "2019-05-21T17:19:00.000Z",
            "2021-05-21T17:19:00.000Z",
            "!FDC 9\/0861 DCA SID RONALD REAGAN WASHINGTON NATIONAL,\nWashington, DC.\nNATIONAL SEVEN DEPARTURE...\nTAKEOFF OBSTACLE NOTES: RWY 22: BUILDING 3439 FT FROM DER, 337 FT\nRIGHT OF CENTERLINE, 118 FT AGL\/153 FT MSL\n(2015-AEA-7017\/7018\/6509\/6512-OE).\nALL OTHER DATA REMAINS AS PUBLISHED. 1905211719-2105211719EST\nCREATED: 21 May 2019 17:19:00 \nSOURCE: KDZZNAXX",
            "KDCA",
            false,
            "2019-05-21T17:19:00.000Z",
            "!FDC 9\/0861-KDCA",
            "airport",
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => "23945153",
            "notamid" => "!FDC 9/0861",
            "country" => "USA",
            "type" => "airport",
            "icao" => "KDCA",
            "startdate" => "2019-05-21 19:19:00",
            "enddate" => "2021-05-21 19:19:00",
            "notam" => '{"_id":"5ce9c618ab233e84992b2337","all":"!FDC 9\/0861 DCA SID RONALD REAGAN WASHINGTON NATIONAL,\nWashington, DC.\nNATIONAL SEVEN DEPARTURE...\nTAKEOFF OBSTACLE NOTES: RWY 22: BUILDING 3439 FT FROM DER, 337 FT\nRIGHT OF CENTERLINE, 118 FT AGL\/153 FT MSL\n(2015-AEA-7017\/7018\/6509\/6512-OE).\nALL OTHER DATA REMAINS AS PUBLISHED. 1905211719-2105211719EST\nCREATED: 21 May 2019 17:19:00 \nSOURCE: KDZZNAXX","id":"!FDC 9\/0861","location":"KDCA","isICAO":false,"key":"!FDC 9\/0861-KDCA","type":"airport","Created":"2019-05-21T17:19:00.000Z","startdate":"2019-05-21T17:19:00.000Z","enddate":"2021-05-21T17:19:00.000Z","StateCode":"USA","StateName":"United States of America"}',
            "geometry" => '{"multipolygon":[[[10.8833,54.5667],[10.9833,54.4958],[10.8833,54.4333],[10.8833,54.5667]],[[10.8833,54.5667],[10.9833,54.4958],[10.8833,54.4333],[10.8833,54.5667]]],"bottom":null,"top":400}'
        );
    }
}
