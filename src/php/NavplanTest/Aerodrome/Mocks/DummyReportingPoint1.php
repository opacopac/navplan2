<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\Mocks;

use Navplan\Aerodrome\DomainModel\ReportingPoint;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;


class DummyReportingPoint1 {
    public static function create(): ReportingPoint {
        return new ReportingPoint(
            3,
            "POINT",
            "LSZB",
            "E1",
            false,
            true,
            true,
            new Length(3500, LengthUnit::FT),
            new Length(4500, LengthUnit::FT),
            new Position2d(7.5475,46.9458),
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 3,
            "type" => "POINT",
            "airport_icao" => "LSZB",
            "name" => "E1",
            "heli" => NULL,
            "inbd_comp" => 1,
            "outbd_comp" => 1,
            "min_ft" => 3500,
            "max_ft" => 4500,
            "latitude" =>46.9458,
            "longitude" => 7.5475,
            "polygon" => ""
        );
    }


    public static function createRest(): array {
        return array(
            "id" => 3,
            "type" => "POINT",
            "airport_icao" => "LSZB",
            "name" => "E1",
            "heli" => FALSE,
            "inbd_comp" => TRUE,
            "outbd_comp" => TRUE,
            "alt_min" => [3500, "FT"],
            "alt_max" => [4500, "FT"],
            "pos" => [7.5475, 46.9458],
            "polygon" => NULL
        );
    }
}
