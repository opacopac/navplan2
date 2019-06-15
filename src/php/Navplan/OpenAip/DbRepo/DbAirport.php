<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Airport;


class DbAirport {
    public static function fromDbResult(array $rs): Airport {
        return new Airport(
            intval($rs["id"]),
            $rs["type"],
            $rs["name"],
            $rs["icao"] !== "" ? $rs["icao"] : NULL,
            $rs["country"],
            new Position2d(floatval($rs["longitude"]), floatval($rs["latitude"])),
            new Length(floatval($rs["elevation"]), LengthUnit::M),
            [],
            [],
            [],
            [],
            []
        );
    }
}
