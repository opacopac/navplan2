<?php declare(strict_types=1);

namespace Navplan\Terrain\RestModel;


use http\Exception\InvalidArgumentException;

class ReadElevationRequestConverter {
    public static function fromArgs(array $args): array {
        if (!$args["lon"] || !$args["lat"])
            throw new InvalidArgumentException("ERROR: parameters 'lat' and/or 'lon' missing!");

        $positions[] = [ floatval($args["lon"]), floatval($args["lat"]) ];
        if ($args["lon2"] && $args["lat2"])
            $positions[] = [ floatval($args["lon2"]), floatval($args["lat2"]) ];

        return $positions;
    }
}
