<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Traffic\DomainModel\TrafficAdsbex;


class RestTrafficAdsbexConverter {
    public static function toRest(TrafficAdsbex $traffic): array {
        return array(
            "addr" => RestTrafficAddressConverter::toRest($traffic->address),
            "icaotype" => $traffic->icaoType,
            "reg" => $traffic->registration,
            "call" => $traffic->callsign,
            "opicao" => $traffic->opIcao,
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPositionConverter::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
