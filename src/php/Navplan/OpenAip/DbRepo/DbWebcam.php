<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Webcam;
use Navplan\Shared\StringNumberService;


class DbWebcam {
    public static function fromDbResult(array $rs): Webcam {
        return new Webcam(
            $rs["name"],
            $rs["url"],
            self::getPosition($rs)
        );
    }


    private static function getPosition(array $rs): ?Position2d {
        if (StringNumberService::isNullOrEmpty($rs, "latitude") || StringNumberService::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
