<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Navaid;


class DummyNavaid1 {
    public static function create(): Navaid {
        return new Navaid(
            1218,
            "VOR-DME",
            "FRI",
            "FRIBOURG",
            new Position2d(7.22361,46.7775),
            799,
            "110.85",
            "MHz",
            1.34846,
            false
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 1218,
            "type" => "VOR-DME",
            "kuerzel" => "FRI",
            "name" => "FRIBOURG",
            "latitude" => 46.7775,
            "longitude" => 7.22361,
            "elevation" => 799,
            "frequency" => "110.85",
            "unit" => "MHz",
            "declination" => 1.34846,
            "truenorth" => false
        );
    }
}
