<?php declare(strict_types=1);

namespace Navplan\Terrain\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;


class RestReadElevationRequest {
    /**
     * @param Position2d[] $positions
     */
    public function __construct(public array $positions) {
    }


    public static function fromRest(array $args): RestReadElevationRequest {
        if (!isset($args["lon"]) || !isset($args["lat"])) {
            throw new InvalidArgumentException("ERROR: parameters 'lat' and/or 'lon' missing!");
        }

        $positions[] = new Position2d(floatval($args["lon"]), floatval($args["lat"]));
        if (isset($args["lon2"]) && isset($args["lat2"])) {
            $positions[] = new Position2d(floatval($args["lon2"]), floatval($args["lat2"]));
        }

        return new RestReadElevationRequest($positions);
    }
}
