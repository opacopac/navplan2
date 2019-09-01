<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\MeteoSma\Domain\SmaStation;


class DummySmaStation2 {
    public static function create(): SmaStation {
        return new SmaStation(
            "BEZ",
            "Beznau",
            new Position2d(8.23325, 47.5572),
            new Altitude(325, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createRest(): array {
        return array(
            "id" => "BEZ",
            "name" => "Beznau",
            "pos" => [8.23325, 47.5572],
            "alt" => [325, "M", "MSL"]
        );
    }
}
