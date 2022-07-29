<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\Mocks;


use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;


class DummyAirportRunway1 {
    public static function create(): AirportRunway {
        return new AirportRunway(
            "14/32",
            "ASPH",
            new Length(1730, LengthUnit::M),
            new Length(30, LengthUnit::M),
            140,
            320,
            new Length(1730, LengthUnit::M),
            new Length(1530, LengthUnit::M),
            new Length(1530, LengthUnit::M),
            new Length(1730, LengthUnit::M),
            true,
            true
        );
    }


    public static function createDbResult(): array {
        return array(
            "airport_id" => 22203,
            "name" => "14/32",
            "surface" => "ASPH",
            "length" => 1730,
            "width" => 30,
            "direction1" => 140,
            "direction2" => 320,
            "tora1" => 1730,
            "tora2" => 1530,
            "lda1" => 1530,
            "lda2" => 1730,
            "papi1" => 1,
            "papi2" => 1,
        );
    }


    public static function createRest(): array {
        return array(
            "name" => "14/32",
            "surface" => "ASPH",
            "length" => [1730, "M"],
            "width" => [30, "M"],
            "direction1" => 140,
            "direction2" => 320,
            "tora1" => [1730, "M"],
            "tora2" => [1530, "M"],
            "lda1" => [1530, "M"],
            "lda2" => [1730, "M"],
            "papi1" => TRUE,
            "papi2" => TRUE,
        );
    }
}
