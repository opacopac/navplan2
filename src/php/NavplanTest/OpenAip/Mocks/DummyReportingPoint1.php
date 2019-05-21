<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\ReportingPoint;


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
            3500,
            4500,
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
}
