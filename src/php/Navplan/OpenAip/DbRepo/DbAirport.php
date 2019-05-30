<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Airport;
use Navplan\OpenAip\Domain\Webcam;


class DbAirport {
    public static function fromDbResult(array $rs): Airport {
        return new Airport(
            intval($rs["id"]),
            $rs["type"],
            $rs["name"],
            $rs["icao"],
            $rs["country"],
            new Position2d(floatval($rs["longitude"]), floatval($rs["latitude"])),
            floatval($rs["elevation"]),
            [],
            [],
            [],
            [],
            []
        );
    }


    private function readAirportWebcamFromResult(array $rs): Webcam {
        return new Webcam(
            $rs["name"],
            $rs["url"],
            NULL
        );
    }
}
