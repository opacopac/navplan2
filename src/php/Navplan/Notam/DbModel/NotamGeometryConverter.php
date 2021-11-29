<?php declare(strict_types=1);

namespace Navplan\Notam\DbModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Circle2d;
use Navplan\Common\DomainModel\IGeometry2d;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\MultiRing2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Ring2d;
use Navplan\Notam\DomainModel\NotamGeometry;


class NotamGeometryConverter {
    public static function fromDbRow(array $row): ?NotamGeometry {
        if (!isset($row["geometry"])) {
            return NULL;
        }

        $geometry = json_decode($row["geometry"], true);
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
