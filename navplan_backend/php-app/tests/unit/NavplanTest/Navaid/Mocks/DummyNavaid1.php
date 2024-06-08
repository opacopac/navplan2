<?php declare(strict_types=1);

namespace NavplanTest\Navaid\Mocks;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\Domain\Model\Frequency;
use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Navaid\Domain\Model\Navaid;
use Navplan\Navaid\Domain\Model\NavaidType;


class DummyNavaid1 {
    public static function create(): Navaid {
        return new Navaid(
            1218,
            NavaidType::DVOR_DME,
            "FRI",
            "FRIBOURG",
            new Position2d(7.22361,46.7775),
            new Altitude(799, AltitudeUnit::M, AltitudeReference::MSL),
            new Frequency(110.85, FrequencyUnit::MHZ),
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
