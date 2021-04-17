<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Notam\DomainModel\Notam;
use Navplan\Notam\DomainModel\NotamGeometry;

class DummyNotam1 {
    public static function create(): Notam {
        return new Notam(
            23947586,
            "IND",
            "India",
            "C0310/07",
            "SA",
            "AS",
            "SAAS",
            "ATM",
            "Air traffic and VOLMET services",
            "Availability",
            "Automatic terminal information service",
            "Unserviceable",
            "DATIS 126.8 MHZ NOT AVBL\nCREATED: 24 Aug 2007 10:57:00 \nSOURCE: VECCYNYX",
            "2007-08-24T11:30:00.000Z",
            "2007-08-30T11:30:00.000Z",
            "C0310\/07 NOTAMR C0307\/07\nQ) VECF\/QSAAS\/IV\/NBO\/A\/000\/999\/\nA) VEBS B) 0708241130 C) 0708301130 EST\nE) DATIS 126.8 MHZ NOT AVBL\nCREATED: 24 Aug 2007 10:57:00 \nSOURCE: VECCYNYX",
            "VEBS",
            true,
            "2007-08-24T10:57:00.000Z",
            "C0310\/07-VEBS",
            "airport",
            new NotamGeometry(
                new Circle2d(new Position2d(22.366667, -34), new Length(9260, LengthUnit::NM)),
                NULL,
                NULL
            )
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => "23947586",
            "notamid" => "C0310/07",
            "country" => "IND",
            "type" => "airport",
            "icao" => "VEBS",
            "startdate" => "2017-12-07 12:20:00",
            "enddate" => "2018-03-07 00:59:00",
            "notam" => '{"_id":"5ce9c618ab233e84992b1da0","id":"C0310\/07","entity":"SA","status":"AS","Qcode":"SAAS","Area":"ATM","SubArea":"Air traffic and VOLMET services","Condition":"Availability","Subject":"Automatic terminal information service","Modifier":"Unserviceable","message":"DATIS 126.8 MHZ NOT AVBL\nCREATED: 24 Aug 2007 10:57:00 \nSOURCE: VECCYNYX","startdate":"2007-08-24T11:30:00.000Z","enddate":"2007-08-30T11:30:00.000Z","all":"C0310\/07 NOTAMR C0307\/07\nQ) VECF\/QSAAS\/IV\/NBO\/A\/000\/999\/\nA) VEBS B) 0708241130 C) 0708301130 EST\nE) DATIS 126.8 MHZ NOT AVBL\nCREATED: 24 Aug 2007 10:57:00 \nSOURCE: VECCYNYX","location":"VEBS","isICAO":true,"Created":"2007-08-24T10:57:00.000Z","key":"C0310\/07-VEBS","type":"airport","StateCode":"IND","StateName":"India"}',
            "geometry" => '{"bottom":0,"top":150,"center":[-22.883333,16.133333],"radius":9260}'
        );
    }


    public static function createRest(): array {
        return array(
            "id" => 23947586,
            "statecode" => "IND",
            "statename" => "India",
            "notamid" => "C0310/07",
            "entity" => "SA",
            "status" => "AS",
            "qcode" => "SAAS",
            "area" => "ATM",
            "subarea" => "Air traffic and VOLMET services",
            "condition" => "Availability",
            "subject" => "Automatic terminal information service",
            "modifier" => "Unserviceable",
            "message" => "DATIS 126.8 MHZ NOT AVBL\nCREATED: 24 Aug 2007 10:57:00 \nSOURCE: VECCYNYX",
            "startdate" => "2007-08-24T11:30:00.000Z",
            "enddate" => "2007-08-30T11:30:00.000Z",
            "all" => "C0310\/07 NOTAMR C0307\/07\nQ) VECF\/QSAAS\/IV\/NBO\/A\/000\/999\/\nA) VEBS B) 0708241130 C) 0708301130 EST\nE) DATIS 126.8 MHZ NOT AVBL\nCREATED: 24 Aug 2007 10:57:00 \nSOURCE: VECCYNYX",
            "location" => "VEBS",
            "isicao" => true,
            "created" => "2007-08-24T10:57:00.000Z",
            "key" => "C0310\/07-VEBS",
            "type" => "airport",
            "geometry" => array(
                "circle" => array(
                    "center" => [22.366667, -34],
                    "radius" => [9260, "NM"]
                ),
                "alt_bottom" => NULL,
                "alt_top" => NULL
            )
        );
    }
}
