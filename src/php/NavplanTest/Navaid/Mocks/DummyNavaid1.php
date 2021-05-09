<?php declare(strict_types=1);

namespace NavplanTest\Navaid\Mocks;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Navaid\DomainModel\Navaid;


class DummyNavaid1 {
    public static function create(): Navaid {
        return new Navaid(
            1218,
            "VOR-DME",
            "FRI",
            "FRIBOURG",
            new Position2d(7.22361,46.7775),
            new Length(799, LengthUnit::M),
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


    public static function createRest(): array {
        return array(
            "id" => 1218,
            "type" => "VOR-DME",
            "kuerzel" => "FRI",
            "name" => "FRIBOURG",
            "pos" => [7.22361, 46.7775],
            "elevation" => [799, "M"],
            "frequency" => "110.85",
            "unit" => "MHz",
            "declination" => 1.34846,
            "truenorth" => false,
        );
    }
}
