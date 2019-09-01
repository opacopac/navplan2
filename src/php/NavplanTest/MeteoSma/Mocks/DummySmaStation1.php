<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\MeteoSma\Domain\SmaStation;


class DummySmaStation1 {
    public static function create(): SmaStation {
        return new SmaStation(
            "BER",
            "Bern / Zollikofen",
            new Position2d(7.464, 46.9907),
            new Altitude(552, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createRest(): array {
        return array(
            "id" => "BER",
            "name" => "Bern / Zollikofen",
            "pos" => [7.464, 46.9907],
            "alt" => [552, "M", "MSL"]
        );
    }
}
