<?php declare(strict_types=1);

namespace Navplan\Terrain\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;


class ReadElevationListRequestConverter {
    public static function fromArgs(array $args): array {
        if (!$args || !$args["positions"] || count($args["positions"]) == 0) {
            throw new InvalidArgumentException("ERROR: parameter 'positions' missing or empty!");
        }

        return array_map(
            function ($posPair) { return new Position2d($posPair[0], $posPair[1]); },
            $args["positions"]
        );
    }
}
