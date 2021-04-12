<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\IGeometry2d;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\MultiRing2d;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Ring2d;
use Navplan\Notam\Domain\NotamGeometry;


class NotamGeometryConverter {
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
