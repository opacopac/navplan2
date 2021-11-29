<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;


class ReadVerticalMapRequest {
    /**
     * @param Position2d[] $wpPositions
     */
    public function __construct(public array $wpPositions) {
    }


    public static function fromArgs(array $args): ReadVerticalMapRequest {
        if (!$args || !$args["positions"] || count($args["positions"]) < 2) {
            throw new InvalidArgumentException("ERROR: parameter 'positions' missing or less than 2 positions!");
        }

        return new ReadVerticalMapRequest(
            array_map(
                function ($posPair) { return new Position2d($posPair[0], $posPair[1]); },
                $args["positions"]
            )
        );
    }
}
