<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbModel;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainModel\Webcam;
use Navplan\Shared\StringNumberHelper;


class DbWebcamConverter {
    public static function fromDbResult(array $rs): Webcam {
        return new Webcam(
            $rs["name"],
            $rs["url"],
            self::getPosition($rs)
        );
    }


    private static function getPosition(array $rs): ?Position2d {
        if (StringNumberHelper::isNullOrEmpty($rs, "latitude") || StringNumberHelper::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
