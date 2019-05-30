<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Circle2d;
use Navplan\Geometry\Domain\IGeometry2d;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\MultiRing2d;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Domain\Ring2d;
use Navplan\Notam\Domain\NotamGeometry;


class DbNotamGeometry {
    public static function fromDbResult(array $rs): ?NotamGeometry {
        if (!isset($rs["geometry"])) {
            return NULL;
        }

        $geometry = json_decode($rs["geometry"], true);
        $altBottom = self::readAltBottomFromGeometry($geometry);
        $altTop = self::readAltTopFromResult($geometry);
        $shape = self::readShapeFromResult($geometry);

        if ($shape === NULL) {
            return NULL;
        }

        return new NotamGeometry(
            $shape,
            $altBottom,
            $altTop
        );
    }


    private static function readAltBottomFromGeometry(array $geometry): ?Altitude {
        if (isset($geometry["bottom"])) {
            return new Altitude(
                $geometry["bottom"],
                AltitudeUnit::FL,
                AltitudeReference::STD
            );
        }

        return NULL;
    }


    private static function readAltTopFromResult(array $geometry): ?Altitude {
        if (isset($geometry["top"])) {
            return new Altitude(
                $geometry["top"],
                AltitudeUnit::FL,
                AltitudeReference::STD
            );
        }

        return NULL;
    }


    private static function readShapeFromResult(array $geometry): ?IGeometry2d {
        if (isset($geometry["polygon"])) {
            return Ring2d::createFromArray($geometry["polygon"]);
        } else if (isset($geometry["multipolygon"])) {
            return MultiRing2d::createFromArray($geometry["multipolygon"]);
        } else if (isset($geometry["center"]) && isset($geometry["radius"])) {
            return new Circle2d(
                Position2d::createFromArray($geometry["center"]),
                new Length($geometry["radius"], LengthUnit::NM)
            );
        }

        return NULL;
    }
}
