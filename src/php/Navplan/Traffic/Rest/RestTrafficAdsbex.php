<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficAdsbex;


class RestTrafficAdsbex {
    public static function toRest(TrafficAdsbex $traffic): array {
        return array(
            "addr" => RestTrafficAddress::toRest($traffic->address),
            "icaotype" => $traffic->icaoType,
            "reg" => $traffic->registration,
            "call" => $traffic->callsign,
            "opicao" => $traffic->opIcao,
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPosition::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
