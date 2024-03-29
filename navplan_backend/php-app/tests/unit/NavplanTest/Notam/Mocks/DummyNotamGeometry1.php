<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Notam\Domain\Model\NotamGeometry;


class DummyNotamGeometry1 {
    public static function create(): NotamGeometry {
        return new NotamGeometry(
            new Circle2d(new Position2d(-22.883333,16.133333), new Length(9260, LengthUnit::NM)),
            Altitude::fromFl(0),
            Altitude::fromFl(150)
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
