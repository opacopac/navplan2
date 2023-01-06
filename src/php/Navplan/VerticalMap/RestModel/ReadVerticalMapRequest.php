<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Line2d;
use Navplan\Common\Rest\Converter\RestLine2dConverter;


class ReadVerticalMapRequest {
    const ARG_POSITIONS = "positions";


    public function __construct(public Line2d $route) {
    }


    public static function fromArgs(array $args): ReadVerticalMapRequest {
        if (!$args || !$args[self::ARG_POSITIONS] || count($args[self::ARG_POSITIONS]) < 2) {
            throw new InvalidArgumentException("ERROR: parameter '" . self::ARG_POSITIONS . "' missing or less than 2 positions!");
        }

        return new ReadVerticalMapRequest(
            RestLine2dConverter::fromRest($args[self::ARG_POSITIONS])
        );
    }
}
