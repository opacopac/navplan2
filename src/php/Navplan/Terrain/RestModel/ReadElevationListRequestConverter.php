<?php declare(strict_types=1);

namespace Navplan\Terrain\RestModel;

use InvalidArgumentException;


class ReadElevationListRequestConverter {
    public static function fromArgs(array $args): array {
        if (!$args || !$args["positions"] || count($args["positions"]) == 0)
            throw new InvalidArgumentException("ERROR: parameter 'positions' missing or empty!");

        return $args["positions"];
    }
}
