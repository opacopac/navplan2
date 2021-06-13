<?php declare(strict_types=1);

namespace Navplan\Terrain\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;


class ReadElevationRequestConverter {
    public static function fromArgs(array $args): array {
        if (!isset($args["lon"]) || !isset($args["lat"])) {
            throw new InvalidArgumentException("ERROR: parameters 'lat' and/or 'lon' missing!");
        }

        $positions[] = new Position2d(floatval($args["lon"]), floatval($args["lat"]));
        if (isset($args["lon2"]) && isset($args["lat2"])) {
            $positions[] = new Position2d(floatval($args["lon2"]), floatval($args["lat2"]));
        }

        return $positions;
    }
}
