<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Ring2d;
use Navplan\OpenAip\DomainModel\Airspace;


class DummyAirspace1 {
    public static function create(): Airspace {
        return new Airspace(
            12517,
            94317,
            "CTR",
            "CH",
            "CTR Payerne (HX): 128.67",
            new Altitude(0, AltitudeUnit::FT, AltitudeReference::GND),
            new Altitude(100, AltitudeUnit::FL, AltitudeReference::STD),
            Ring2d::createFromArray([
                [6.9919444444444, 46.939444444444],
                [7.0763888888889, 46.875833333333],
                [6.8536111111111, 46.735555555556],
                [6.7691666666667, 46.798888888889],
                [6.9919444444444, 46.939444444444]
            ])
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 12517,
            "aip_id" => 94317,
            "category" => "CTR",
            "country" => "CH",
            "name" => "CTR Payerne (HX): 128.67",
            "alt_bottom_reference" => "GND",
            "alt_bottom_height" => 0,
            "alt_bottom_unit" => "F",
            "alt_top_reference" => "STD",
            "alt_top_height" => 100,
            "alt_top_unit" => "FL",
            "polygon" => "6.9919444444444 46.939444444444, 7.0763888888889 46.875833333333, 6.8536111111111 46.735555555556, 6.7691666666667 46.798888888889, 6.9919444444444 46.939444444444"
        );
    }


    public static function createRest(): array {
        return array(
            "id" => 12517,
            "aip_id" => 94317,
            "category" => "CTR",
            "country" => "CH",
            "name" => "CTR Payerne (HX): 128.67",
            "alt_bottom" => [0, "FT", "GND"],
            "alt_top" => [100, "FL", "STD"],
            "polygon" => [
                [6.9919, 46.9394],
                [7.0764, 46.8758],
                [6.8536, 46.7356],
                [6.7692, 46.7989],
                [6.9919, 46.9394]
            ]
        );
    }
}
