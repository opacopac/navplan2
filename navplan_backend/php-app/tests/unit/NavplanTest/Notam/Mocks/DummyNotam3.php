<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Domain\Model\NotamGeometry;

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
            new NotamGeometry(
                Ring2d::createFromArray([[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]]),
                Altitude::fromFl(0),
                Altitude::fromFl(130)
            )
        );
    }


    public static function createDbResult(): array
    {
        return array(
            "id" => "23928241",
            "notamid" => "W0997/19",
            "country" => "CHE",
            "type" => "airspace",
            "icao" => "LSAS",
            "startdate" => "2019-05-27 16:00:00",
            "enddate" => "2019-05-27 16:40:00",
            "notam" => '{"_id":"5ce9c61eab233e84992b7e0b","id":"W0997\/19","entity":"RR","status":"CA","Qcode":"RRCA","Area":"Navigation Warnings","SubArea":"Airspace restrictions","Condition":"Changes","Subject":"Restricted area","Modifier":"Activated","message":"R-AREA LS-R2 HOHGANT ACT.","startdate":"2019-05-27T14:00:00.000Z","enddate":"2019-05-27T14:40:00.000Z","all":"W0997\/19 NOTAMN \nQ) LSAS\/QRRCA\/V\/BO\/W\/100\/130\/4648N00801E018\nA) LSAS B) 1905271400 C) 1905271440\nE) R-AREA LS-R2 HOHGANT ACT.\nF) FL100\nG) FL130\nCREATED: 24 May 2019 10:36:00 \nSOURCE: LSSNYNYX","location":"LSAS","isICAO":true,"Created":"","key":"W0997\/19-LSAS","type":"airspace","StateCode":"CHE","StateName":"Switzerland"}',
            "geometry" => '{"polygon":[[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]]}'
        );
    }


    public static function createRest(): array {
        return array(
            "id" => 23928241,
            "statecode" => "CHE",
            "statename" => "Switzerland",
            "notamid" => "W0997\/19",
            "entity" => "RR",
            "status" => "CA",
            "qcode" => "RRCA",
            "area" => "Navigation Warnings",
            "subarea" => "Airspace restrictions",
            "condition" => "Changes",
            "subject" => "Restricted area",
            "modifier" => "Activated",
            "message" => "R-AREA LS-R2 HOHGANT ACT.",
            "startdate" => "2019-05-27T14:00:00.000Z",
            "enddate" => "2019-05-27T14:40:00.000Z",
            "all" => "W0997\/19 NOTAMN \nQ) LSAS\/QRRCA\/V\/BO\/W\/100\/130\/4648N00801E018\nA) LSAS B) 1905271400 C) 1905271440\nE) R-AREA LS-R2 HOHGANT ACT.\nF) FL100\nG) FL130\nCREATED: 24 May 2019 10:36:00 \nSOURCE: LSSNYNYX",
            "location" => "LSAS",
            "isicao" => true,
            "created" => "",
            "key" => "W0997\/19-LSAS",
            "type" => "airspace",
            "geometry" => array(
                "polygon" => [[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]],
                "alt_bottom" => [0, "FL", "STD"],
                "alt_top" => [130, "FL", "STD"]
            )
        );
    }
}
