<?php declare(strict_types=1);

namespace Navplan\Airport\RestModel;

use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Geometry\RestModel\Line2dConverter;


class RestAirportCircuitConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(AirportCircuit $circuit): array {
        return array(
            "name" => $circuit->airportIcao,
            "line2dlist" => Line2dConverter::multiLinetoRest($circuit->line2dList, self::ROUND_DIGITS_POS)
        );
    }
}
