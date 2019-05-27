<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Circle2d;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Notam\Domain\NotamGeometry;


class DummyNotamGeometry1 {
    public static function create(): NotamGeometry {
        return new NotamGeometry(
            new Circle2d(new Position2d(-22.883333,16.133333), new Length(9260, LengthUnit::NM)),
            new Altitude(0, AltitudeUnit::FL, AltitudeReference::STD),
            new Altitude(150, AltitudeUnit::FL, AltitudeReference::STD)
        );
    }


    public static function createDbResult(): array {
        return array(
            "geometry" => '{"bottom":0,"top":150,"center":[-22.883333,16.133333],"radius":9260}'
        );
    }
}
