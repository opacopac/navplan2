<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\Mocks;


use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;


class DummyAirportRunway2 {
    public static function create(): AirportRunway {
        return new AirportRunway(
            "14R/32L",
            "GRAS",
            new Length(650, LengthUnit::M),
            new Length(30, LengthUnit::M),
            140,
            320,
            new Length(650, LengthUnit::M),
            new Length(650, LengthUnit::M),
            new Length(650, LengthUnit::M),
            new Length(650, LengthUnit::M),
            false,
            false
        );
    }


    public static function createDbResult(): array {
        return array(
            "airport_id" => 22203,
            "name" => "14R/32L",
            "surface" => "GRAS",
            "length" => 650,
            "width" => 30,
            "direction1" => 140,
            "direction2" => 320,
            "tora1" => 650,
            "tora2" => 650,
            "lda1" => 650,
            "lda2" => 650,
            "papi1" => 0,
            "papi2" => 0,
        );
    }


    public static function createRest(): array {
        return array(
            "name" => "14R/32L",
            "surface" => "GRAS",
            "length" => [650, "M"],
            "width" => [30, "M"],
            "direction1" => 140,
            "direction2" => 320,
            "tora1" => [650, "M"],
            "tora2" => [650, "M"],
            "lda1" => [650, "M"],
            "lda2" => [650, "M"],
            "papi1" => FALSE,
            "papi2" => FALSE,
        );
    }
}
