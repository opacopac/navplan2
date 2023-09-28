<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\AirportCircuit;
use Navplan\Common\Rest\Converter\RestLine2dConverter;


class RestAirportCircuitConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(AirportCircuit $circuit): array {
        return array(
            "name" => $circuit->airportIcao,
            "line2dlist" => RestLine2dConverter::multiLinetoRest($circuit->line2dList, self::ROUND_DIGITS_POS)
        );
    }


    public static function toRestList(array $airportCircuitList): array {
        return array_map(function ($airportCircuit) { return self::toRest($airportCircuit); }, $airportCircuitList);
    }
}
