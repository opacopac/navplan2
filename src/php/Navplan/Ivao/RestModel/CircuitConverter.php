<?php declare(strict_types=1);

namespace Navplan\Ivao\RestModel;

use Navplan\Geometry\RestModel\Line2dConverter;
use Navplan\Ivao\DomainModel\Circuit;


class CircuitConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(Circuit $circuit): array {
        return array(
            "name" => $circuit->airportIcao,
            "line2dlist" => Line2dConverter::multiLinetoRest($circuit->line2dList, self::ROUND_DIGITS_POS)
        );
    }
}
