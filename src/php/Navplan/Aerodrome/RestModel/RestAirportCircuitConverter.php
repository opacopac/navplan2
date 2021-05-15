<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestModel;

use Navplan\Aerodrome\DomainModel\AirportCircuit;
use Navplan\Common\RestModel\RestLine2dConverter;


class RestAirportCircuitConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(AirportCircuit $circuit): array {
        return array(
            "name" => $circuit->airportIcao,
            "line2dlist" => RestLine2dConverter::multiLinetoRest($circuit->line2dList, self::ROUND_DIGITS_POS)
        );
    }


    public static function listToRest(array $airportCircuitList): array {
        return array_map(function ($airportCircuit) { return self::toRest($airportCircuit); }, $airportCircuitList);
    }
}
