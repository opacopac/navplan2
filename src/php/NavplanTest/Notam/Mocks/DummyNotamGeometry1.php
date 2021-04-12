<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
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


    public static function createRest(): array {
        return array(
            "circle" => array(
                "center" => [-22.883333, 16.133333],
                "radius" => [9260, "NM"]
            ),
            "alt_bottom" => [0, "FL", "STD"],
            "alt_top" => [150, "FL", "STD"]
        );
    }
}
