<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Notam\Domain\Notam;

class DummyNotam3
{
    public static function create(): Notam
    {
        return new Notam(
            23928241,
            "CHE",
            "Switzerland",
            "W0997\/19",
            "RR",
            "CA",
            "RRCA",
            "Navigation Warnings",
            "Airspace restrictions",
            "Changes",
            "Restricted area",
            "Activated",
            "R-AREA LS-R2 HOHGANT ACT.",
            "2019-05-27T14:00:00.000Z",
            "2019-05-27T14:40:00.000Z",
            "W0997\/19 NOTAMN \nQ) LSAS\/QRRCA\/V\/BO\/W\/100\/130\/4648N00801E018\nA) LSAS B) 1905271400 C) 1905271440\nE) R-AREA LS-R2 HOHGANT ACT.\nF) FL100\nG) FL130\nCREATED: 24 May 2019 10:36:00 \nSOURCE: LSSNYNYX",
            "LSAS",
            TRUE,
            "",
            "W0997\/19-LSAS",
            "airspace",
            "TODO"
        );
    }


    public static function createDbResult(): array
    {
        return array(
            "id" => "23921655",
            "notamid" => "W0997/19",
            "country" => "CHE",
            "type" => "airspace",
            "icao" => "LSAS",
            "startdate" => "2019-05-27 16:00:00",
            "enddate" => "2019-05-27 16:40:00",
            "notam" => '{"_id":"5ce9c61eab233e84992b7e0b","id":"W0997\/19","entity":"RR","status":"CA","Qcode":"RRCA","Area":"Navigation Warnings","SubArea":"Airspace restrictions","Condition":"Changes","Subject":"Restricted area","Modifier":"Activated","message":"R-AREA LS-R2 HOHGANT ACT.","startdate":"2019-05-27T14:00:00.000Z","enddate":"2019-05-27T14:40:00.000Z","all":"W0997\/19 NOTAMN \nQ) LSAS\/QRRCA\/V\/BO\/W\/100\/130\/4648N00801E018\nA) LSAS B) 1905271400 C) 1905271440\nE) R-AREA LS-R2 HOHGANT ACT.\nF) FL100\nG) FL130\nCREATED: 24 May 2019 10:36:00 \nSOURCE: LSSNYNYX","location":"LSAS","isICAO":true,"Created":"","key":"W0997\/19-LSAS","type":"airspace","StateCode":"CHE","StateName":"Switzerland"}'
        );
    }
}
